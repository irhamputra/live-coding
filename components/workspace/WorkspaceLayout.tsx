'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import type { FileSystemMap, FSNode, NpmPackage, RoomState } from '@/lib/types'
import { getPreviewTypeForTemplate, type PreviewType } from '@/lib/templates'
import FileTree from './FileTree'
import CodeEditor, { setEditorContent } from './CodeEditor'
import PreviewPanel from './PreviewPanel'

interface Props {
  roomId: string
}

function getDescendants(files: FileSystemMap, nodeId: string): string[] {
  const result: string[] = []
  for (const [id, node] of Object.entries(files)) {
    if (node.parentId === nodeId) {
      result.push(id)
      result.push(...getDescendants(files, id))
    }
  }
  return result
}

export default function WorkspaceLayout({ roomId }: Props) {
  const [files, setFiles] = useState<FileSystemMap>({})
  const [packages, setPackages] = useState<NpmPackage[]>([])
  const [activeFileId, setActiveFileId] = useState<string | null>(null)
  const [openTabs, setOpenTabs] = useState<string[]>([])
  const [projectName, setProjectName] = useState('')
  const [previewType, setPreviewType] = useState<PreviewType>('none')
  const [connected, setConnected] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [serverPort, setServerPort] = useState<number | undefined>(undefined)
  const [serverReady, setServerReady] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [pkgSearch, setPkgSearch] = useState('')
  const [pkgResults, setPkgResults] = useState<{ name: string; version: string }[]>([])
  const [showPkgSearch, setShowPkgSearch] = useState(false)

  const socketRef = useRef<Socket | null>(null)
  const senderIdRef = useRef(uuidv4())
  const editorRef = useRef<ReactCodeMirrorRef | null>(null)
  const activeFileIdRef = useRef<string | null>(null)
  const updateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pkgSearchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { activeFileIdRef.current = activeFileId }, [activeFileId])

  // ── Socket setup ────────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = io()
    socketRef.current = socket

    socket.on('connect', () => {
      socket.emit('room:join', roomId, (state: RoomState | null) => {
        if (!state) { setNotFound(true); return }
        setFiles(state.files)
        setPackages(state.packages)
        setProjectName(state.projectName)
        setPreviewType(getPreviewTypeForTemplate(state.template))
        if (state.serverPort) setServerPort(state.serverPort)
        if (state.serverReady) setServerReady(true)
        // Open the designated entry file, or fall back to the first file
        const entryId = state.entryFileId ?? Object.values(state.files).find(n => n.type === 'file')?.id
        if (entryId) {
          setActiveFileId(entryId)
          setOpenTabs([entryId])
        }
        setConnected(true)
      })
    })

    socket.on('file:updated', ({ fileId, content, senderId }: { fileId: string; content: string; senderId: string }) => {
      if (senderId === senderIdRef.current) return
      setFiles(prev => {
        const node = prev[fileId]
        if (!node || node.type !== 'file') return prev
        return { ...prev, [fileId]: { ...node, content } }
      })
      if (fileId === activeFileIdRef.current) setEditorContent(editorRef, content)
    })

    socket.on('file:created', ({ node }: { node: FSNode }) => {
      setFiles(prev => ({ ...prev, [node.id]: node }))
    })

    socket.on('file:deleted', ({ nodeId }: { nodeId: string }) => {
      setFiles(prev => {
        const next = { ...prev }
        for (const id of [...getDescendants(prev, nodeId), nodeId]) delete next[id]
        return next
      })
      setOpenTabs(prev => prev.filter(id => id !== nodeId))
      setActiveFileId(prev => prev === nodeId ? null : prev)
    })

    socket.on('file:renamed', ({ nodeId, newName }: { nodeId: string; newName: string }) => {
      setFiles(prev => {
        const node = prev[nodeId]
        if (!node) return prev
        return { ...prev, [nodeId]: { ...node, name: newName } }
      })
    })

    socket.on('package:added', ({ pkg }: { pkg: NpmPackage }) => {
      setPackages(prev => prev.find(p => p.name === pkg.name) ? prev : [...prev, pkg])
    })

    socket.on('package:removed', ({ packageName }: { packageName: string }) => {
      setPackages(prev => prev.filter(p => p.name !== packageName))
    })

    socket.on('server:ready', () => setServerReady(true))
    socket.on('server:error', (msg: string) => setServerError(msg))

    return () => { socket.disconnect() }
  }, [roomId])

  // ── Package search ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!pkgSearch.trim()) { setPkgResults([]); return }
    if (pkgSearchTimer.current) clearTimeout(pkgSearchTimer.current)
    pkgSearchTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://registry.npmjs.org/search/suggestions?q=${encodeURIComponent(pkgSearch)}&size=6`
        )
        const data = await res.json()
        setPkgResults(data.map((p: { name: string; version: string }) => ({ name: p.name, version: p.version })))
      } catch { setPkgResults([]) }
    }, 300)
  }, [pkgSearch])

  // ── File handlers ───────────────────────────────────────────────────────────
  const handleFileSelect = (fileId: string) => {
    setActiveFileId(fileId)
    setOpenTabs(prev => prev.includes(fileId) ? prev : [...prev, fileId])
  }

  const closeTab = (tabId: string) => {
    const nextTabs = openTabs.filter(id => id !== tabId)
    setOpenTabs(nextTabs)
    if (activeFileId === tabId) {
      const idx = openTabs.indexOf(tabId)
      setActiveFileId(nextTabs[Math.max(0, idx - 1)] ?? null)
    }
  }

  const handleFileChange = useCallback((content: string) => {
    const fileId = activeFileIdRef.current
    if (!fileId) return
    if (updateTimer.current) clearTimeout(updateTimer.current)
    updateTimer.current = setTimeout(() => {
      setFiles(prev => {
        const node = prev[fileId]
        if (!node || node.type !== 'file') return prev
        return { ...prev, [fileId]: { ...node, content } }
      })
      socketRef.current?.emit('file:update', { roomId, fileId, content, senderId: senderIdRef.current })
    }, 300)
  }, [roomId])

  const handleFileCreate = useCallback((parentId: string | null, type: 'file' | 'directory', name: string) => {
    const id = uuidv4()
    const node: FSNode = type === 'file'
      ? { id, type: 'file', name, parentId, content: '' }
      : { id, type: 'directory', name, parentId }
    setFiles(prev => ({ ...prev, [id]: node }))
    socketRef.current?.emit('file:create', { roomId, node, senderId: senderIdRef.current })
    if (type === 'file') {
      setActiveFileId(id)
      setOpenTabs(prev => [...prev, id])
    }
  }, [roomId])

  const handleFileDelete = useCallback((nodeId: string) => {
    setFiles(prev => {
      const next = { ...prev }
      for (const id of [...getDescendants(prev, nodeId), nodeId]) delete next[id]
      return next
    })
    setOpenTabs(prev => prev.filter(id => id !== nodeId))
    setActiveFileId(prev => prev === nodeId ? null : prev)
    socketRef.current?.emit('file:delete', { roomId, nodeId, senderId: senderIdRef.current })
  }, [roomId])

  const handleFileRename = useCallback((nodeId: string, newName: string) => {
    setFiles(prev => {
      const node = prev[nodeId]
      if (!node) return prev
      return { ...prev, [nodeId]: { ...node, name: newName } }
    })
    socketRef.current?.emit('file:rename', { roomId, nodeId, newName, senderId: senderIdRef.current })
  }, [roomId])

  // ── Package handlers ────────────────────────────────────────────────────────
  const handlePackageAdd = (name: string, version: string) => {
    const pkg: NpmPackage = { name, version }
    setPackages(prev => prev.find(p => p.name === name) ? prev : [...prev, pkg])
    socketRef.current?.emit('package:add', { roomId, pkg, senderId: senderIdRef.current })
    setPkgSearch('')
    setPkgResults([])
    setShowPkgSearch(false)
  }

  const handlePackageRemove = (packageName: string) => {
    setPackages(prev => prev.filter(p => p.name !== packageName))
    socketRef.current?.emit('package:remove', { roomId, packageName, senderId: senderIdRef.current })
  }

  const copyLink = () => navigator.clipboard.writeText(window.location.href)

  if (notFound) {
    return (
      <div className="ws-not-found">
        <h1>Room not found</h1>
        <p>This project doesn't exist or has expired.</p>
        <a href="/">← Back to Home</a>
      </div>
    )
  }

  const activeFile = activeFileId ? files[activeFileId] : null
  const activeFileNode = activeFile?.type === 'file' ? activeFile : null

  return (
    <div className="workspace">
      {/* Toolbar */}
      <div className="ws-toolbar">
        <div className="ws-toolbar__left">
          <a href="/" className="ws-toolbar__logo">CodeCollab</a>
          {projectName && <span className="ws-toolbar__project">{projectName}</span>}
        </div>
        <div className="ws-toolbar__right">
          <span className={`ws-status${connected ? ' ws-status--on' : ''}`}>
            {connected ? '● Live' : '○ Connecting...'}
          </span>
          <button className="ws-toolbar__btn" onClick={copyLink}>Share 🔗</button>
        </div>
      </div>

      {/* Body */}
      <div className="ws-body">
        {/* Sidebar */}
        <div className="ws-sidebar">
          <div className="ws-sidebar__tree">
            <FileTree
              files={files}
              activeFileId={activeFileId}
              onFileSelect={handleFileSelect}
              onFileCreate={handleFileCreate}
              onFileDelete={handleFileDelete}
              onFileRename={handleFileRename}
            />
          </div>

          {/* Packages */}
          <div className="ws-packages">
            <div className="ws-packages__header">
              <span>PACKAGES</span>
              <button onClick={() => setShowPkgSearch(s => !s)} title="Add package">+</button>
            </div>
            {showPkgSearch && (
              <div className="ws-packages__search-wrap">
                <input
                  className="ws-packages__input"
                  value={pkgSearch}
                  onChange={e => setPkgSearch(e.target.value)}
                  placeholder="Search npm..."
                  autoFocus
                />
                {pkgResults.length > 0 && (
                  <ul className="ws-packages__dropdown">
                    {pkgResults.map(r => (
                      <li key={r.name} onClick={() => handlePackageAdd(r.name, r.version)}>
                        <span className="ws-packages__pkg-name">{r.name}</span>
                        <span className="ws-packages__pkg-version">@{r.version}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {packages.length > 0 && (
              <ul className="ws-packages__list">
                {packages.map(p => (
                  <li key={p.name} className="ws-packages__item">
                    <span className="ws-packages__item-name">{p.name}</span>
                    <span className="ws-packages__item-ver">@{p.version}</span>
                    <button onClick={() => handlePackageRemove(p.name)} title="Remove">×</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Editor Panel */}
        <div className="ws-editor-panel">
          {openTabs.length > 0 && (
            <div className="ws-tabs">
              {openTabs.map(tabId => {
                const node = files[tabId]
                if (!node || node.type !== 'file') return null
                return (
                  <div
                    key={tabId}
                    className={`ws-tab${tabId === activeFileId ? ' ws-tab--active' : ''}`}
                    onClick={() => setActiveFileId(tabId)}
                  >
                    <span>{node.name}</span>
                    <button
                      className="ws-tab__close"
                      onClick={e => { e.stopPropagation(); closeTab(tabId) }}
                    >×</button>
                  </div>
                )
              })}
            </div>
          )}
          <div className="ws-editor-body">
            {activeFileNode ? (
              <CodeEditor
                key={activeFileId!}
                fileId={activeFileId!}
                filename={activeFileNode.name}
                initialContent={activeFileNode.content}
                onChange={handleFileChange}
                editorRef={editorRef}
              />
            ) : (
              <div className="ws-no-file">Select a file to start editing</div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        {previewType !== 'none' && (
          <div className="ws-preview-panel">
            {serverError ? (
              <div className="preview-server-error">
                <div className="preview-server-error__icon">⚠️</div>
                <p>Failed to start Next.js server</p>
                <pre>{serverError}</pre>
              </div>
            ) : (
              <PreviewPanel
                files={files}
                packages={packages}
                previewType={previewType}
                serverUrl={serverPort ? `http://127.0.0.1:${serverPort}` : undefined}
                serverReady={serverReady}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
