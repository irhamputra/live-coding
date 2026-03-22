'use client'

import { useRef, useEffect } from 'react'
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { oneDark } from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { rust } from '@codemirror/lang-rust'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { php } from '@codemirror/lang-php'
import { sql } from '@codemirror/lang-sql'
import { markdown } from '@codemirror/lang-markdown'
import { StreamLanguage } from '@codemirror/language'
import { go } from '@codemirror/legacy-modes/mode/go'
import type { Extension } from '@codemirror/state'

function getExtensions(filename: string): Extension[] {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  const wrap = EditorView.lineWrapping
  switch (ext) {
    case 'html':              return [html(), wrap]
    case 'css':               return [css(), wrap]
    case 'js': case 'mjs':   return [javascript(), wrap]
    case 'jsx':               return [javascript({ jsx: true }), wrap]
    case 'ts':                return [javascript({ typescript: true }), wrap]
    case 'tsx':               return [javascript({ jsx: true, typescript: true }), wrap]
    case 'py':                return [python(), wrap]
    case 'rs':                return [rust(), wrap]
    case 'java':              return [java(), wrap]
    case 'cpp': case 'c': case 'h': return [cpp(), wrap]
    case 'go':                return [StreamLanguage.define(go), wrap]
    case 'php':               return [php(), wrap]
    case 'sql':               return [sql(), wrap]
    case 'md':                return [markdown(), wrap]
    default:                  return [wrap]
  }
}

export interface CodeEditorHandle {
  setContent: (content: string) => void
}

interface Props {
  fileId: string         // key — remounts when file switches
  filename: string
  initialContent: string
  onChange: (value: string) => void
  editorRef: React.RefObject<ReactCodeMirrorRef | null>
}

export default function CodeEditor({ fileId, filename, initialContent, onChange, editorRef }: Props) {
  const extensions = getExtensions(filename)

  return (
    <CodeMirror
      key={fileId}
      ref={editorRef as React.RefObject<ReactCodeMirrorRef>}
      defaultValue={initialContent}
      extensions={extensions}
      theme={oneDark}
      onChange={onChange}
      basicSetup={{ lineNumbers: true, foldGutter: true }}
      style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}
      className="code-mirror-fill"
    />
  )
}

// Helper to push content into an editor without triggering onChange
export function setEditorContent(ref: React.RefObject<ReactCodeMirrorRef | null>, content: string) {
  const view = ref.current?.view
  if (!view) return
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: content } })
}
