'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { oneDark } from '@uiw/react-codemirror'
import { io, Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import {
  MODES,
  MODE_LIST,
  CATEGORIES,
  buildPreview,
  type EditorMode,
  type ModeConfig,
  type ContentState,
} from '@/lib/modes'

interface CodePayload extends ContentState {
  id: string
  mode: EditorMode
}

function setEditorContent(ref: React.RefObject<ReactCodeMirrorRef | null>, content: string) {
  const view = ref.current?.view
  if (!view) return
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: content },
  })
}

function hasContent(content: ContentState, mode: ModeConfig): boolean {
  if (mode.type === 'multi') {
    return !!(content.html.trim() || content.css.trim() || content.js.trim())
  }
  return !!content.code.trim()
}

export default function Editor() {
  const [id] = useState<string>(() => uuidv4())
  const [modeId, setModeId] = useState<EditorMode>('html-css-js')
  const mode = MODES[modeId]

  // Sync modeId ke ref agar socket handler bisa baca tanpa stale closure
  const modeIdRef = useRef<EditorMode>('html-css-js')
  modeIdRef.current = modeId

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const socketRef = useRef<Socket | null>(null)

  // Refs untuk konten editor saat ini (tidak trigger re-render)
  const htmlRef = useRef('')
  const cssRef = useRef('')
  const jsRef = useRef('')
  const codeRef = useRef('')

  // Preview state — satu-satunya yang menggerakkan re-render iframe
  const [preview, setPreview] = useState<ContentState>(mode.defaults)

  // CodeMirror editor refs
  const htmlEditorRef = useRef<ReactCodeMirrorRef>(null)
  const cssEditorRef = useRef<ReactCodeMirrorRef>(null)
  const jsEditorRef = useRef<ReactCodeMirrorRef>(null)
  const codeEditorRef = useRef<ReactCodeMirrorRef>(null)

  // ─── Socket.io ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = io()
    socketRef.current = socket

    socket.on('code-update', (data: CodePayload) => {
      if (data.id === id) return

      const currentModeId = modeIdRef.current

      // Update content refs
      htmlRef.current = data.html
      cssRef.current = data.css
      jsRef.current = data.js
      codeRef.current = data.code

      if (data.mode !== currentModeId) {
        // Remote user ganti mode — ikut switch (tanpa dialog, ini dari remote)
        setModeId(data.mode)
      } else {
        // Mode sama — update editor secara langsung
        if (MODES[data.mode].type === 'multi') {
          setEditorContent(htmlEditorRef, data.html)
          setEditorContent(cssEditorRef, data.css)
          setEditorContent(jsEditorRef, data.js)
        } else {
          setEditorContent(codeEditorRef, data.code)
        }
      }

      setPreview({ html: data.html, css: data.css, js: data.js, code: data.code })
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [id])

  // ─── Render preview ke iframe ───────────────────────────────────────────────
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe || !mode.canPreview) return
    const doc = iframe.contentDocument
    if (!doc) return

    const content = buildPreview(mode, preview)
    doc.open()
    doc.write(content)
    doc.close()
  }, [preview, mode])

  // ─── Mode change ───────────────────────────────────────────────────────────
  const handleModeChange = useCallback(
    (newModeId: EditorMode) => {
      const currentMode = MODES[modeIdRef.current]
      const currentContent: ContentState = {
        html: htmlRef.current,
        css: cssRef.current,
        js: jsRef.current,
        code: codeRef.current,
      }

      // Tampilkan dialog konfirmasi jika ada konten yang sudah ditulis
      if (hasContent(currentContent, currentMode)) {
        const confirmed = window.confirm(
          `⚠️ Kode ${currentMode.name} kamu belum disimpan.\n\nJika kamu pindah ke mode lain, kode ini akan hilang.\n\nLanjutkan?`
        )
        if (!confirmed) return
      }

      const newMode = MODES[newModeId]

      // Reset konten ke default mode baru
      htmlRef.current = newMode.defaults.html
      cssRef.current = newMode.defaults.css
      jsRef.current = newMode.defaults.js
      codeRef.current = newMode.defaults.code

      setModeId(newModeId)
      setPreview(newMode.defaults)

      // Sync ke semua user lain
      socketRef.current?.emit('code-update', {
        id,
        mode: newModeId,
        ...newMode.defaults,
      })
    },
    [id]
  )

  // ─── OnChange handlers (uncontrolled — tidak pakai value prop) ─────────────
  const handleHtmlChange = useCallback(
    (value: string) => {
      htmlRef.current = value
      setPreview(prev => ({ ...prev, html: value }))
      socketRef.current?.emit('code-update', {
        id,
        mode: modeIdRef.current,
        html: value,
        css: cssRef.current,
        js: jsRef.current,
        code: codeRef.current,
      })
    },
    [id]
  )

  const handleCssChange = useCallback(
    (value: string) => {
      cssRef.current = value
      setPreview(prev => ({ ...prev, css: value }))
      socketRef.current?.emit('code-update', {
        id,
        mode: modeIdRef.current,
        html: htmlRef.current,
        css: value,
        js: jsRef.current,
        code: codeRef.current,
      })
    },
    [id]
  )

  const handleJsChange = useCallback(
    (value: string) => {
      jsRef.current = value
      setPreview(prev => ({ ...prev, js: value }))
      socketRef.current?.emit('code-update', {
        id,
        mode: modeIdRef.current,
        html: htmlRef.current,
        css: cssRef.current,
        js: value,
        code: codeRef.current,
      })
    },
    [id]
  )

  const handleCodeChange = useCallback(
    (value: string) => {
      codeRef.current = value
      setPreview(prev => ({ ...prev, code: value }))
      socketRef.current?.emit('code-update', {
        id,
        mode: modeIdRef.current,
        html: htmlRef.current,
        css: cssRef.current,
        js: jsRef.current,
        code: value,
      })
    },
    [id]
  )

  // ─── Render ────────────────────────────────────────────────────────────────
  const cmStyle: React.CSSProperties = { flex: 1, minHeight: 0, overflow: 'hidden' }

  return (
    <div className="app">
      {/* ── Toolbar ── */}
      <header className="toolbar">
        <span className="toolbar-title">⚡ Live Coding</span>
        <div className="toolbar-right">
          <label className="toolbar-label" htmlFor="mode-select">
            Language
          </label>
          <select
            id="mode-select"
            className="mode-select"
            value={modeId}
            onChange={e => handleModeChange(e.target.value as EditorMode)}
          >
            {CATEGORIES.map(category => (
              <optgroup key={category} label={category}>
                {MODE_LIST.filter(m => m.category === category).map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </header>

      {/* ── Editors ── */}
      <section className={`playground ${mode.canPreview ? '' : 'full-width'}`}>
        {mode.type === 'multi' ? (
          // HTML / CSS / JS — 3 panel
          <>
            <div className="code-editor">
              <div className="editor-header">HTML</div>
              <CodeMirror
                key={`${modeId}-html`}
                ref={htmlEditorRef}
                defaultValue={mode.defaults.html}
                extensions={[...MODES['html-css-js'].extensions]}
                theme={oneDark}
                onChange={handleHtmlChange}
                basicSetup={{ lineNumbers: true }}
                style={cmStyle}
              />
            </div>
            <div className="code-editor">
              <div className="editor-header">CSS</div>
              <CodeMirror
                key={`${modeId}-css`}
                ref={cssEditorRef}
                defaultValue={mode.defaults.css}
                extensions={[...MODES['html-css-js'].extensions]}
                theme={oneDark}
                onChange={handleCssChange}
                basicSetup={{ lineNumbers: true }}
                style={cmStyle}
              />
            </div>
            <div className="code-editor">
              <div className="editor-header">JavaScript</div>
              <CodeMirror
                key={`${modeId}-js`}
                ref={jsEditorRef}
                defaultValue={mode.defaults.js}
                extensions={[...MODES['html-css-js'].extensions]}
                theme={oneDark}
                onChange={handleJsChange}
                basicSetup={{ lineNumbers: true }}
                style={cmStyle}
              />
            </div>
          </>
        ) : (
          // Single panel
          <div className="code-editor single">
            <div className="editor-header">{mode.name}</div>
            <CodeMirror
              key={modeId}
              ref={codeEditorRef}
              defaultValue={mode.defaults.code}
              extensions={mode.extensions}
              theme={oneDark}
              onChange={handleCodeChange}
              basicSetup={{ lineNumbers: true }}
              style={cmStyle}
            />
          </div>
        )}
      </section>

      {/* ── Result panel ── */}
      {mode.canPreview ? (
        <section className="result">
          <iframe ref={iframeRef} title="result" className="iframe" />
        </section>
      ) : (
        <section className="result no-preview">
          <div className="no-preview-content">
            <div className="no-preview-icon">🖥️</div>
            <p className="no-preview-title">Preview tidak tersedia</p>
            <p className="no-preview-sub">
              {mode.name} tidak bisa dijalankan di browser secara langsung.
              <br />
              Tulis kode di sini lalu jalankan di environment lokal kamu.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
