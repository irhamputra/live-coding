'use client'

import { useState, useRef } from 'react'
import type { FileSystemMap, FSNode } from '@/lib/types'

interface Props {
  files: FileSystemMap
  activeFileId: string | null
  onFileSelect: (fileId: string) => void
  onFileCreate: (parentId: string | null, type: 'file' | 'directory', name: string) => void
  onFileDelete: (nodeId: string) => void
  onFileRename: (nodeId: string, newName: string) => void
}

interface TreeNode {
  node: FSNode
  children: TreeNode[]
}

function buildTree(files: FileSystemMap, parentId: string | null): TreeNode[] {
  return Object.values(files)
    .filter(n => n.parentId === parentId)
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'directory' ? -1 : 1
      return a.name.localeCompare(b.name)
    })
    .map(node => ({ node, children: node.type === 'directory' ? buildTree(files, node.id) : [] }))
}

function fileIcon(name: string, isDir: boolean): string {
  if (isDir) return '📁'
  const ext = name.split('.').pop()?.toLowerCase()
  const icons: Record<string, string> = {
    html: '🌐', css: '🎨', js: '⚡', jsx: '⚛️', ts: '🔷', tsx: '⚛️',
    py: '🐍', rs: '⚙️', java: '☕', go: '🐹', cpp: '⚡', c: '⚡',
    php: '🐘', sql: '🗄️', md: '📝', json: '📋', toml: '📋',
    txt: '📄', sh: '💻', vue: '💚',
  }
  return icons[ext ?? ''] ?? '📄'
}

interface NodeRowProps extends Omit<Props, 'files'> {
  treeNode: TreeNode
  depth: number
}

function NodeRow({ treeNode, depth, activeFileId, onFileSelect, onFileCreate, onFileDelete, onFileRename }: NodeRowProps) {
  const { node, children } = treeNode
  const [isOpen, setIsOpen] = useState(true)
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(node.name)
  const [showNewInput, setShowNewInput] = useState<'file' | 'directory' | null>(null)
  const [newName, setNewName] = useState('')
  const renameRef = useRef<HTMLInputElement>(null)
  const newRef = useRef<HTMLInputElement>(null)

  const isActive = node.type === 'file' && node.id === activeFileId

  const commitRename = () => {
    const trimmed = renameValue.trim()
    if (trimmed && trimmed !== node.name) onFileRename(node.id, trimmed)
    setRenaming(false)
  }

  const commitNew = (type: 'file' | 'directory') => {
    const trimmed = newName.trim()
    if (trimmed) onFileCreate(node.type === 'directory' ? node.id : node.parentId, type, trimmed)
    setShowNewInput(null)
    setNewName('')
  }

  return (
    <div>
      <div
        className={`tree-row ${isActive ? 'tree-row--active' : ''}`}
        style={{ paddingLeft: depth * 14 + 8 }}
        onClick={() => {
          if (node.type === 'file') onFileSelect(node.id)
          else setIsOpen(o => !o)
        }}
      >
        <span className="tree-row__icon">
          {node.type === 'directory' ? (isOpen ? '▾' : '▸') : ''}
          {fileIcon(node.name, node.type === 'directory')}
        </span>

        {renaming ? (
          <input
            ref={renameRef}
            className="tree-rename-input"
            value={renameValue}
            autoFocus
            onChange={e => setRenameValue(e.target.value)}
            onBlur={commitRename}
            onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenaming(false) }}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span className="tree-row__name">{node.name}</span>
        )}

        <span className="tree-row__actions" onClick={e => e.stopPropagation()}>
          {node.type === 'directory' && (
            <>
              <button title="New file" onClick={() => { setShowNewInput('file'); setIsOpen(true) }}>+📄</button>
              <button title="New folder" onClick={() => { setShowNewInput('directory'); setIsOpen(true) }}>+📁</button>
            </>
          )}
          <button title="Rename" onClick={() => { setRenaming(true); setRenameValue(node.name) }}>✏️</button>
          <button title="Delete" onClick={() => {
            if (window.confirm(`Delete "${node.name}"?`)) onFileDelete(node.id)
          }}>🗑️</button>
        </span>
      </div>

      {node.type === 'directory' && isOpen && (
        <>
          {showNewInput && (
            <div style={{ paddingLeft: (depth + 1) * 14 + 8 }}>
              <input
                ref={newRef}
                className="tree-rename-input"
                placeholder={showNewInput === 'file' ? 'filename.js' : 'folder-name'}
                value={newName}
                autoFocus
                onChange={e => setNewName(e.target.value)}
                onBlur={() => commitNew(showNewInput)}
                onKeyDown={e => { if (e.key === 'Enter') commitNew(showNewInput!); if (e.key === 'Escape') { setShowNewInput(null); setNewName('') } }}
              />
            </div>
          )}
          {children.map(child => (
            <NodeRow
              key={child.node.id}
              treeNode={child}
              depth={depth + 1}
              activeFileId={activeFileId}
              onFileSelect={onFileSelect}
              onFileCreate={onFileCreate}
              onFileDelete={onFileDelete}
              onFileRename={onFileRename}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default function FileTree({ files, activeFileId, onFileSelect, onFileCreate, onFileDelete, onFileRename }: Props) {
  const [newRootInput, setNewRootInput] = useState<'file' | 'directory' | null>(null)
  const [newRootName, setNewRootName] = useState('')
  const rootTree = buildTree(files, null)

  const commitRoot = (type: 'file' | 'directory') => {
    const trimmed = newRootName.trim()
    if (trimmed) onFileCreate(null, type, trimmed)
    setNewRootInput(null)
    setNewRootName('')
  }

  return (
    <div className="file-tree">
      <div className="file-tree__header">
        <span>FILES</span>
        <span className="file-tree__header-actions">
          <button title="New file" onClick={() => setNewRootInput('file')}>+📄</button>
          <button title="New folder" onClick={() => setNewRootInput('directory')}>+📁</button>
        </span>
      </div>

      {newRootInput && (
        <div style={{ padding: '4px 8px' }}>
          <input
            className="tree-rename-input"
            placeholder={newRootInput === 'file' ? 'filename.js' : 'folder-name'}
            value={newRootName}
            autoFocus
            onChange={e => setNewRootName(e.target.value)}
            onBlur={() => commitRoot(newRootInput)}
            onKeyDown={e => { if (e.key === 'Enter') commitRoot(newRootInput!); if (e.key === 'Escape') { setNewRootInput(null); setNewRootName('') } }}
          />
        </div>
      )}

      <div className="file-tree__body">
        {rootTree.map(child => (
          <NodeRow
            key={child.node.id}
            treeNode={child}
            depth={0}
            activeFileId={activeFileId}
            onFileSelect={onFileSelect}
            onFileCreate={onFileCreate}
            onFileDelete={onFileDelete}
            onFileRename={onFileRename}
          />
        ))}
      </div>
    </div>
  )
}
