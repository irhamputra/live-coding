// ─── File System ──────────────────────────────────────────────────────────────

export interface FileNode {
  id: string
  type: 'file'
  name: string
  parentId: string | null
  content: string
}

export interface DirectoryNode {
  id: string
  type: 'directory'
  name: string
  parentId: string | null
}

export type FSNode = FileNode | DirectoryNode
export type FileSystemMap = Record<string, FSNode>

// ─── Packages ─────────────────────────────────────────────────────────────────

export interface NpmPackage {
  name: string
  version: string   // e.g. "4.17.21"
}

// ─── Room / Project ───────────────────────────────────────────────────────────

export type FrameworkTemplate =
  | 'html-css-js'
  | 'react'
  | 'vue'
  | 'nextjs'
  | 'typescript'
  | 'python'
  | 'rust'
  | 'go'
  | 'java'
  | 'cpp'
  | 'php'
  | 'sql'
  | 'markdown'

export interface RoomState {
  roomId: string
  projectName: string
  template: FrameworkTemplate
  files: FileSystemMap
  packages: NpmPackage[]
  createdAt: number
  updatedAt: number
  serverPort?: number    // Set for templates that run a child dev server (e.g. nextjs)
  entryFileId?: string   // File to open by default in the editor
  serverReady?: boolean  // True once the child dev server is accepting connections
}

// ─── Socket Event Payloads ────────────────────────────────────────────────────

export interface FileUpdatePayload {
  roomId: string
  fileId: string
  content: string
  senderId: string
}

export interface FileCreatePayload {
  roomId: string
  node: FSNode
  senderId: string
}

export interface FileDeletePayload {
  roomId: string
  nodeId: string
  senderId: string
}

export interface FileRenamePayload {
  roomId: string
  nodeId: string
  newName: string
  senderId: string
}

export interface PackagePayload {
  roomId: string
  pkg: NpmPackage
  senderId: string
}

export interface PackageRemovePayload {
  roomId: string
  packageName: string
  senderId: string
}
