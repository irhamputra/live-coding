import { createServer } from 'http'
import { parse } from 'url'
import { spawn, type ChildProcess } from 'child_process'
import { promises as fsp } from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as net from 'net'
import next from 'next'
import { Server } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'
import type { RoomState, NpmPackage, FSNode, FileSystemMap } from './lib/types'
import { buildInitialFiles } from './lib/templates'
import type { FrameworkTemplate } from './lib/types'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT ?? '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// ─── In-memory room store ─────────────────────────────────────────────────────
const rooms = new Map<string, RoomState>()

// ─── Next.js child process registry ──────────────────────────────────────────
interface NextProcess {
  port: number
  proc: ChildProcess
  dir: string
}
const nextProcesses = new Map<string, NextProcess>()

// ─── Port utils ───────────────────────────────────────────────────────────────
function findFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer()
    srv.listen(0, '127.0.0.1', () => {
      const addr = srv.address() as net.AddressInfo
      srv.close(() => resolve(addr.port))
    })
    srv.on('error', reject)
  })
}

function waitForPort(checkPort: number, timeout = 45_000): Promise<void> {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeout
    const tryConnect = () => {
      if (Date.now() > deadline) { reject(new Error('Timeout waiting for Next.js server')); return }
      const sock = new net.Socket()
      const timer = setTimeout(() => { sock.destroy(); tryConnect() }, 600)
      sock.on('connect', () => { clearTimeout(timer); sock.destroy(); resolve() })
      sock.on('error', () => { clearTimeout(timer); setTimeout(tryConnect, 600) })
      sock.connect(checkPort, '127.0.0.1')
    }
    tryConnect()
  })
}

// ─── Virtual FS path helper ───────────────────────────────────────────────────
function getVirtualPath(files: FileSystemMap, nodeId: string): string {
  const parts: string[] = []
  let current: string | null = nodeId
  while (current) {
    const fsNode: FSNode | undefined = files[current]
    if (!fsNode) break
    parts.unshift(fsNode.name)
    current = fsNode.parentId
  }
  return parts.join(path.sep)
}

// ─── Write virtual FS to disk ─────────────────────────────────────────────────
async function writeFSToDisk(files: FileSystemMap, baseDir: string) {
  // Directories first
  for (const node of Object.values(files)) {
    if (node.type === 'directory') {
      await fsp.mkdir(path.join(baseDir, getVirtualPath(files, node.id)), { recursive: true })
    }
  }
  // Files
  for (const node of Object.values(files)) {
    if (node.type === 'file') {
      const fp = path.join(baseDir, getVirtualPath(files, node.id))
      await fsp.mkdir(path.dirname(fp), { recursive: true })
      await fsp.writeFile(fp, node.content, 'utf-8')
    }
  }
}

// ─── Sync single file/dir to disk ────────────────────────────────────────────
async function syncNodeToDisk(files: FileSystemMap, nodeId: string, baseDir: string) {
  const node = files[nodeId]
  if (!node) return
  const fp = path.join(baseDir, getVirtualPath(files, nodeId))
  if (node.type === 'directory') {
    await fsp.mkdir(fp, { recursive: true })
  } else {
    await fsp.mkdir(path.dirname(fp), { recursive: true })
    await fsp.writeFile(fp, node.content, 'utf-8')
  }
}

// ─── Start a Next.js child dev server ────────────────────────────────────────
async function startNextServer(roomId: string, files: FileSystemMap, nextPort: number): Promise<void> {
  const tempDir = path.join(os.tmpdir(), `livecode-${roomId}`)
  await fsp.mkdir(tempDir, { recursive: true })

  // Write project files
  await writeFSToDisk(files, tempDir)

  // Symlink node_modules from the host project so we don't have to npm install
  const nmLink = path.join(tempDir, 'node_modules')
  try {
    await fsp.symlink(path.join(process.cwd(), 'node_modules'), nmLink)
  } catch { /* already exists */ }

  // Locate the Next.js binary via the host project
  const nextBin = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next')

  // Build a clean env: inherit everything except parent NEXT_* vars that
  // confuse the child's config detection, then disable telemetry prompts.
  const childEnv = { ...process.env }
  for (const k of Object.keys(childEnv)) {
    if (k.startsWith('NEXT_')) delete childEnv[k]
  }
  childEnv.NODE_ENV = 'development'
  childEnv.NEXT_TELEMETRY_DISABLED = '1'

  const proc = spawn('node', [nextBin, 'dev', '--port', String(nextPort), '--hostname', '127.0.0.1'], {
    cwd: tempDir,
    env: childEnv,
    stdio: 'pipe',
  })

  proc.stdout.on('data', (d: Buffer) => process.stdout.write(`[next:${roomId}] ${d}`))
  proc.stderr.on('data', (d: Buffer) => process.stderr.write(`[next:${roomId}] ${d}`))
  proc.on('exit', (code: number | null) => console.log(`[next:${roomId}] exited (${code})`))

  nextProcesses.set(roomId, { port: nextPort, proc, dir: tempDir })

  // Wait until the dev server accepts connections
  await waitForPort(nextPort)
  console.log(`[next:${roomId}] ready on port ${nextPort}`)
}

async function cleanupNextServer(roomId: string) {
  const info = nextProcesses.get(roomId)
  if (!info) return
  info.proc.kill('SIGTERM')
  nextProcesses.delete(roomId)
  try { await fsp.rm(info.dir, { recursive: true, force: true }) } catch { /* ignore */ }
}

// Kill all child processes on exit
process.on('exit', () => { for (const { proc } of nextProcesses.values()) proc.kill() })
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getDescendants(files: Record<string, FSNode>, nodeId: string): string[] {
  const result: string[] = []
  for (const [id, node] of Object.entries(files)) {
    if (node.parentId === nodeId) {
      result.push(id)
      result.push(...getDescendants(files, id))
    }
  }
  return result
}

function updatePackageJson(room: RoomState) {
  const pkgNode = Object.values(room.files).find(n => n.type === 'file' && n.name === 'package.json')
  if (!pkgNode || pkgNode.type !== 'file') return
  try {
    const current = JSON.parse(pkgNode.content)
    current.dependencies = Object.fromEntries(room.packages.map(p => [p.name, `^${p.version}`]))
    pkgNode.content = JSON.stringify(current, null, 2)
  } catch { /* ignore malformed */ }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true)
    await handle(req, res, parsedUrl)
  })

  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    // ── Join existing room ─────────────────────────────────────────────────
    socket.on('room:join', (roomId: string, callback: (state: RoomState | null) => void) => {
      socket.join(roomId)
      const room = rooms.get(roomId) ?? null
      callback(room)
      // If the child server was already ready before this client joined, send
      // the event directly so the client doesn't miss it.
      if (room?.serverReady) socket.emit('server:ready')
    })

    // ── Create new room ────────────────────────────────────────────────────
    socket.on(
      'room:create',
      async (
        payload: { projectName: string; template: FrameworkTemplate; packages: NpmPackage[] },
        callback: (state: RoomState) => void
      ) => {
        const roomId = uuidv4().slice(0, 8)
        const { files, defaultPackages, entryFileId } = buildInitialFiles(payload.template, payload.projectName)

        const pkgMap = new Map<string, NpmPackage>()
        for (const p of defaultPackages) pkgMap.set(p.name, p)
        for (const p of payload.packages) pkgMap.set(p.name, p)

        // Reserve a port for Next.js rooms before returning state
        let serverPort: number | undefined
        if (payload.template === 'nextjs') {
          serverPort = await findFreePort()
        }

        const state: RoomState = {
          roomId,
          projectName: payload.projectName,
          template: payload.template,
          files,
          packages: Array.from(pkgMap.values()),
          createdAt: Date.now(),
          updatedAt: Date.now(),
          serverPort,
          entryFileId,
          serverReady: false,
        }

        rooms.set(roomId, state)
        socket.join(roomId)
        callback(state)   // Return immediately — client navigates to editor

        console.log(`[room:create] ${roomId} "${payload.projectName}" (${payload.template}) entry=${entryFileId}`)

        // Start Next.js dev server in the background
        if (payload.template === 'nextjs' && serverPort) {
          startNextServer(roomId, files, serverPort)
            .then(() => {
              state.serverReady = true
              io.to(roomId).emit('server:ready')
            })
            .catch(err => {
              console.error(`[next:${roomId}] Failed to start:`, err)
              io.to(roomId).emit('server:error', String(err))
            })
        }
      }
    )

    // ── File updated ───────────────────────────────────────────────────────
    socket.on('file:update', (payload: { roomId: string; fileId: string; content: string; senderId: string }) => {
      const room = rooms.get(payload.roomId)
      if (!room) return
      const node = room.files[payload.fileId]
      if (!node || node.type !== 'file') return
      node.content = payload.content
      room.updatedAt = Date.now()

      // Sync to disk for Next.js rooms (triggers HMR)
      const np = nextProcesses.get(payload.roomId)
      if (np) {
        const fp = path.join(np.dir, getVirtualPath(room.files, payload.fileId))
        fsp.writeFile(fp, payload.content, 'utf-8').catch(console.error)
      }

      socket.to(payload.roomId).emit('file:updated', {
        fileId: payload.fileId,
        content: payload.content,
        senderId: payload.senderId,
      })
    })

    // ── File created ───────────────────────────────────────────────────────
    socket.on('file:create', (payload: { roomId: string; node: FSNode; senderId: string }) => {
      const room = rooms.get(payload.roomId)
      if (!room) return
      room.files[payload.node.id] = payload.node
      room.updatedAt = Date.now()

      const np = nextProcesses.get(payload.roomId)
      if (np) syncNodeToDisk(room.files, payload.node.id, np.dir).catch(console.error)

      socket.to(payload.roomId).emit('file:created', { node: payload.node, senderId: payload.senderId })
    })

    // ── File deleted ───────────────────────────────────────────────────────
    socket.on('file:delete', (payload: { roomId: string; nodeId: string; senderId: string }) => {
      const room = rooms.get(payload.roomId)
      if (!room) return

      const np = nextProcesses.get(payload.roomId)
      const oldPath = np ? path.join(np.dir, getVirtualPath(room.files, payload.nodeId)) : null

      const toDelete = getDescendants(room.files, payload.nodeId)
      for (const id of toDelete) delete room.files[id]
      delete room.files[payload.nodeId]
      room.updatedAt = Date.now()

      if (oldPath) fsp.rm(oldPath, { recursive: true, force: true }).catch(console.error)

      socket.to(payload.roomId).emit('file:deleted', { nodeId: payload.nodeId, senderId: payload.senderId })
    })

    // ── File renamed ───────────────────────────────────────────────────────
    socket.on('file:rename', (payload: { roomId: string; nodeId: string; newName: string; senderId: string }) => {
      const room = rooms.get(payload.roomId)
      if (!room) return
      const node = room.files[payload.nodeId]
      if (!node) return

      const np = nextProcesses.get(payload.roomId)
      const oldPath = np ? path.join(np.dir, getVirtualPath(room.files, payload.nodeId)) : null

      node.name = payload.newName
      room.updatedAt = Date.now()

      if (oldPath && np) {
        const newPath = path.join(np.dir, getVirtualPath(room.files, payload.nodeId))
        fsp.rename(oldPath, newPath).catch(console.error)
      }

      socket.to(payload.roomId).emit('file:renamed', {
        nodeId: payload.nodeId,
        newName: payload.newName,
        senderId: payload.senderId,
      })
    })

    // ── Package added ──────────────────────────────────────────────────────
    socket.on('package:add', (payload: { roomId: string; pkg: NpmPackage; senderId: string }) => {
      const room = rooms.get(payload.roomId)
      if (!room) return
      if (!room.packages.find(p => p.name === payload.pkg.name)) {
        room.packages.push(payload.pkg)
        updatePackageJson(room)
      }
      room.updatedAt = Date.now()
      socket.to(payload.roomId).emit('package:added', { pkg: payload.pkg, senderId: payload.senderId })
    })

    // ── Package removed ────────────────────────────────────────────────────
    socket.on('package:remove', (payload: { roomId: string; packageName: string; senderId: string }) => {
      const room = rooms.get(payload.roomId)
      if (!room) return
      room.packages = room.packages.filter(p => p.name !== payload.packageName)
      updatePackageJson(room)
      room.updatedAt = Date.now()
      socket.to(payload.roomId).emit('package:removed', {
        packageName: payload.packageName,
        senderId: payload.senderId,
      })
    })
  })

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
