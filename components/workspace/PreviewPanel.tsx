'use client'

import { useMemo } from 'react'
import type { FileSystemMap, NpmPackage } from '@/lib/types'
import { buildWorkspacePreview, type PreviewType } from '@/lib/templates'

interface Props {
  files: FileSystemMap
  packages: NpmPackage[]
  previewType: PreviewType
  serverUrl?: string    // For nextjs-server
  serverReady?: boolean // For nextjs-server
}

export default function PreviewPanel({ files, packages, previewType, serverUrl, serverReady }: Props) {
  const html = useMemo(
    () => (previewType !== 'nextjs-server' ? buildWorkspacePreview(files, packages, previewType) : ''),
    [files, packages, previewType]
  )

  if (previewType === 'none') {
    return (
      <div className="preview-empty">
        <div className="preview-empty__icon">🖥️</div>
        <p className="preview-empty__text">No live preview for this language</p>
      </div>
    )
  }

  if (previewType === 'nextjs-server') {
    if (!serverReady || !serverUrl) {
      return (
        <div className="preview-starting">
          <div className="preview-starting__spinner" />
          <p className="preview-starting__text">Starting Next.js server…</p>
          <p className="preview-starting__sub">This may take 10–20 seconds</p>
        </div>
      )
    }
    return (
      <iframe
        className="preview-frame"
        src={serverUrl}
        title="Next.js Preview"
      />
    )
  }

  return (
    <iframe
      className="preview-frame"
      srcDoc={html}
      sandbox="allow-scripts allow-same-origin"
      title="Preview"
    />
  )
}
