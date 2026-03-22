'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { io, Socket } from 'socket.io-client'
import type { FrameworkTemplate, RoomState } from '@/lib/types'
import { FRAMEWORK_LIST, FRAMEWORK_CATEGORIES } from '@/lib/templates'

const FEATURES = [
  { icon: '⚡', label: 'Real-time sync' },
  { icon: '🌐', label: '13 templates' },
  { icon: '🔗', label: 'Instant share' },
  { icon: '🔑', label: 'No sign-up' },
]

export default function LandingPage() {
  const router = useRouter()
  const [projectName, setProjectName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<FrameworkTemplate>('react')
  const [creating, setCreating] = useState(false)

  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketRef.current = io()
    return () => { socketRef.current?.disconnect() }
  }, [])

  const createProject = () => {
    if (!socketRef.current || creating) return
    const name = projectName.trim() || 'my-project'
    setCreating(true)
    socketRef.current.emit(
      'room:create',
      { projectName: name, template: selectedTemplate, packages: [] },
      (state: RoomState) => { router.push(`/editor/${state.roomId}`) }
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') createProject()
  }

  const selectedFw = FRAMEWORK_LIST.find(f => f.id === selectedTemplate)

  return (
    <div className="landing">
      {/* ── Hero ── */}
      <section className="landing-hero">
        <div className="landing-hero__bg" aria-hidden />
        <div className="landing-hero__content">
          <div className="landing-hero__badge">Open Source · Free</div>
          <h1 className="landing-hero__title">
            Code<span className="landing-hero__accent">Collab</span>
          </h1>
          <p className="landing-hero__sub">
            Online collaborative IDE. Pick a template, write code,<br />
            share a link — code together instantly.
          </p>
          <ul className="landing-features">
            {FEATURES.map(f => (
              <li key={f.label} className="landing-feature">
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Main ── */}
      <main className="landing-main">
        {/* Template picker */}
        <section className="landing-section">
          <h2 className="landing-section__title">Choose a template</h2>
          <p className="landing-section__sub">
            Pick the stack you want to start with. You can add files and packages later.
          </p>
          {FRAMEWORK_CATEGORIES.map(cat => (
            <div key={cat} className="landing-category">
              <span className="landing-category__name">{cat}</span>
              <div className="landing-grid">
                {FRAMEWORK_LIST.filter(f => f.category === cat).map(fw => (
                  <button
                    key={fw.id}
                    className={`fw-card${selectedTemplate === fw.id ? ' fw-card--active' : ''}`}
                    onClick={() => setSelectedTemplate(fw.id)}
                    style={{ '--fw-color': fw.color } as React.CSSProperties}
                    aria-pressed={selectedTemplate === fw.id}
                  >
                    <span className="fw-card__icon">{fw.icon}</span>
                    <span className="fw-card__name">{fw.name}</span>
                    <span className="fw-card__desc">{fw.description}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Create bar */}
        <section className="landing-create-bar">
          <div className="landing-create-bar__inner">
            <div className="landing-create-bar__preview">
              <span className="landing-create-bar__fw-icon">{selectedFw?.icon}</span>
              <span className="landing-create-bar__fw-name">{selectedFw?.name}</span>
            </div>
            <input
              className="landing-create-bar__input"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="project-name"
              aria-label="Project name"
            />
            <button
              className="landing-create-bar__btn"
              onClick={createProject}
              disabled={creating}
            >
              {creating ? (
                <><span className="landing-create-bar__spinner" />Creating…</>
              ) : (
                <>Create Project →</>
              )}
            </button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>Built with Next.js &amp; Socket.io · Open Source</p>
      </footer>
    </div>
  )
}
