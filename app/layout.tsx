import type { Metadata } from 'next'
import './globals.css'

const APP_NAME = 'CodeCollab'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://codecollab.dev'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} — Real-time Collaborative Code Editor`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    'CodeCollab is a free, real-time collaborative online code editor. ' +
    'Create projects from scratch in React, Next.js, Vue, Python, Rust, and more — ' +
    'then share a link to code together instantly.',
  keywords: [
    'collaborative code editor',
    'online IDE',
    'real-time coding',
    'pair programming',
    'live code sharing',
    'React playground',
    'Next.js editor',
    'code together',
  ],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — Real-time Collaborative Code Editor`,
    description:
      'Code together in real time. Supports React, Next.js, Vue, Python, Rust, Go, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} — Real-time Collaborative Code Editor`,
    description:
      'Code together in real time. Supports React, Next.js, Vue, Python, Rust, Go, and more.',
    creator: '@codecollab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
