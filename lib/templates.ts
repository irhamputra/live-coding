import type { FileSystemMap, FrameworkTemplate, NpmPackage } from './types'
import { v4 as uuidv4 } from 'uuid'

// ─── Language from Extension ──────────────────────────────────────────────────

export function getLanguageFromFilename(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase() ?? ''
  const map: Record<string, string> = {
    html: 'html', css: 'css',
    js: 'javascript', jsx: 'jsx', ts: 'typescript', tsx: 'tsx',
    py: 'python', rs: 'rust', java: 'java', go: 'go',
    cpp: 'cpp', c: 'cpp', h: 'cpp',
    php: 'php', sql: 'sql', md: 'markdown',
    json: 'javascript', vue: 'vue',
  }
  return map[ext] ?? 'plaintext'
}

// ─── Template Builder ─────────────────────────────────────────────────────────

function f(name: string, content: string, parentId: string | null = null): [string, import('./types').FileNode] {
  const id = uuidv4()
  return [id, { id, type: 'file', name, parentId, content }]
}

function dir(name: string, parentId: string | null = null): [string, import('./types').DirectoryNode] {
  const id = uuidv4()
  return [id, { id, type: 'directory', name, parentId }]
}

function pkgJson(projectName: string, deps: Record<string, string>): string {
  return JSON.stringify({ name: projectName, version: '1.0.0', private: true, dependencies: deps }, null, 2)
}

export function buildInitialFiles(
  template: FrameworkTemplate,
  projectName: string
): { files: FileSystemMap; defaultPackages: NpmPackage[]; entryFileId: string; previewType: PreviewType } {
  switch (template) {
    case 'html-css-js': {
      const [idHtml, fHtml] = f('index.html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>${projectName}</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Edit the files on the left to get started.</p>
  <script src="script.js"></script>
</body>
</html>`)
      const [idCss, fCss] = f('style.css', `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 40px;
  background: #f5f5f5;
  color: #333;
}

h1 { margin-bottom: 12px; color: #1a1a1a; }
p  { color: #666; }`)
      const [idJs, fJs] = f('script.js', `console.log('Hello from ${projectName}!');`)
      const [idPkg, fPkg] = f('package.json', pkgJson(projectName, {}))
      return {
        files: { [idHtml]: fHtml, [idCss]: fCss, [idJs]: fJs, [idPkg]: fPkg },
        defaultPackages: [],
        entryFileId: idHtml,
        previewType: 'html-css-js',
      }
    }

    case 'react': {
      const [idSrc, dSrc] = dir('src')
      const [idApp, fApp] = f('App.jsx', `export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1>Hello from React!</h1>
      <p>Edit <code>src/App.jsx</code> to get started.</p>
    </div>
  )
}`, dSrc.id)
      const [idMain, fMain] = f('main.jsx', `import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)`, dSrc.id)
      const [idCss, fCss] = f('style.css', `body { margin: 0; font-family: sans-serif; }`)
      const [idPkg, fPkg] = f('package.json', pkgJson(projectName, { react: '^18.3.1', 'react-dom': '^18.3.1' }))
      return {
        files: { [idSrc]: dSrc, [idApp]: fApp, [idMain]: fMain, [idCss]: fCss, [idPkg]: fPkg },
        defaultPackages: [{ name: 'react', version: '18.3.1' }, { name: 'react-dom', version: '18.3.1' }],
        entryFileId: idApp,
        previewType: 'react-cdn',
      }
    }

    case 'vue': {
      const [idSrc, dSrc] = dir('src')
      const [idApp, fApp] = f('App.js', `const { createApp, ref } = Vue

createApp({
  setup() {
    const count = ref(0)
    return { count }
  },
  template: \`
    <div style="font-family: sans-serif; padding: 40px">
      <h1>Hello from Vue!</h1>
      <button @click="count++">Clicked {{ count }} times</button>
    </div>
  \`,
}).mount('#app')`, dSrc.id)
      const [idCss, fCss] = f('style.css', `body { margin: 0; font-family: sans-serif; }`)
      const [idPkg, fPkg] = f('package.json', pkgJson(projectName, { vue: '^3.5.0' }))
      return {
        files: { [idSrc]: dSrc, [idApp]: fApp, [idCss]: fCss, [idPkg]: fPkg },
        defaultPackages: [{ name: 'vue', version: '3.5.0' }],
        entryFileId: idApp,
        previewType: 'vue-cdn',
      }
    }

    case 'nextjs': {
      const [idApp, dApp] = dir('app')
      const [idPage, fPage] = f('page.tsx', `'use client'

import { useState } from 'react'

export default function Page() {
  const [count, setCount] = useState(0)
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '40px', maxWidth: '720px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '12px' }}>Hello from Next.js!</h1>
      <p style={{ color: '#555', marginBottom: '24px' }}>
        Edit <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>app/page.tsx</code> to get started.
      </p>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{ padding: '8px 20px', fontSize: '1rem', cursor: 'pointer', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        Clicked {count} times
      </button>
    </main>
  )
}`, dApp.id)
      const [idLayout, fLayout] = f('layout.tsx', `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${projectName}',
  description: 'Created with LiveCode',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}`, dApp.id)
      const [idConfig, fConfig] = f('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig`)
      const [idTs, fTs] = f('tsconfig.json', JSON.stringify({
        compilerOptions: {
          target: 'ES2017',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          incremental: true,
          paths: { '@/*': ['./*'] },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      }, null, 2))
      const [idPkg, fPkg] = f('package.json', JSON.stringify({
        name: projectName.toLowerCase().replace(/\s+/g, '-'),
        version: '0.1.0',
        private: true,
        scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
        dependencies: { next: '^16.2.1', react: '^19.2.4', 'react-dom': '^19.2.4' },
        devDependencies: { typescript: '^5', '@types/node': '^20', '@types/react': '^19', '@types/react-dom': '^19' },
      }, null, 2))
      return {
        files: { [idApp]: dApp, [idPage]: fPage, [idLayout]: fLayout, [idConfig]: fConfig, [idTs]: fTs, [idPkg]: fPkg },
        defaultPackages: [{ name: 'next', version: '16.2.1' }, { name: 'react', version: '19.2.4' }],
        entryFileId: idPage,
        previewType: 'nextjs-server',
      }
    }

    case 'typescript': {
      const [idMain, fMain] = f('main.ts', `interface User {
  name: string
  age: number
}

function greet(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`
}

const user: User = { name: '${projectName}', age: 25 }
console.log(greet(user))`)
      const [idPkg, fPkg] = f('package.json', pkgJson(projectName, { typescript: '^5.7.3' }))
      return { files: { [idMain]: fMain, [idPkg]: fPkg }, defaultPackages: [], entryFileId: idMain, previewType: 'none' }
    }

    case 'python': {
      const [idMain, fMain] = f('main.py', `def greet(name: str) -> str:
    return f"Hello, {name}!"


if __name__ == "__main__":
    print(greet("${projectName}"))`)
      const [idReq, fReq] = f('requirements.txt', `# Add your Python packages here\n# e.g. requests==2.31.0`)
      return { files: { [idMain]: fMain, [idReq]: fReq }, defaultPackages: [], entryFileId: idMain, previewType: 'none' }
    }

    case 'rust': {
      const [idMain, fMain] = f('main.rs', `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("{}", greet("${projectName}"));
}`)
      const [idCargo, fCargo] = f('Cargo.toml', `[package]\nname = "${projectName.replace(/\s+/g, '-').toLowerCase()}"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]`)
      return { files: { [idMain]: fMain, [idCargo]: fCargo }, defaultPackages: [], entryFileId: idMain, previewType: 'none' }
    }

    case 'go': {
      const [idMain, fMain] = f('main.go', `package main

import "fmt"

func greet(name string) string {
\treturn fmt.Sprintf("Hello, %s!", name)
}

func main() {
\tfmt.Println(greet("${projectName}"))
}`)
      const [idMod, fMod] = f('go.mod', `module ${projectName.replace(/\s+/g, '-').toLowerCase()}\n\ngo 1.22`)
      return { files: { [idMain]: fMain, [idMod]: fMod }, defaultPackages: [], entryFileId: idMain, previewType: 'none' }
    }

    case 'java': {
      const [idMain, fMain] = f('Main.java', `public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) {
        System.out.println(greet("${projectName}"));
    }
}`)
      return { files: { [idMain]: fMain }, defaultPackages: [], entryFileId: idMain, previewType: 'none' }
    }

    case 'cpp': {
      const [idMain, fMain] = f('main.cpp', `#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::cout << greet("${projectName}") << std::endl;
    return 0;
}`)
      return { files: { [idMain]: fMain }, defaultPackages: [], entryFileId: idMain, previewType: 'none' }
    }

    case 'php': {
      const [idMain, fMain] = f('index.php', `<?php

function greet(string $name): string {
    return "Hello, $name!";
}

echo greet("${projectName}");`)
      return { files: { [idMain]: fMain }, defaultPackages: [], entryFileId: idMain, previewType: 'none' }
    }

    case 'sql': {
      const [idMain, fMain] = f('query.sql', `-- ${projectName}

CREATE TABLE users (
  id    INT PRIMARY KEY AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com'),
       ('Bob',   'bob@example.com');

SELECT * FROM users ORDER BY name;`)
      return { files: { [idMain]: fMain }, defaultPackages: [], entryFileId: idMain, previewType: 'none' }
    }

    case 'markdown': {
      const [idMain, fMain] = f('README.md', `# ${projectName}

A collaborative documentation project.

## Getting Started

Write your **Markdown** here. The preview updates in real time.

## Features

- Live preview
- Real-time collaboration
- Syntax highlighting

> Edit this file to get started!`)
      return { files: { [idMain]: fMain }, defaultPackages: [], entryFileId: idMain, previewType: 'markdown' }
    }

    default: {
      const [idMain, fMain] = f('index.html', `<h1>Hello, ${projectName}!</h1>`)
      return { files: { [idMain]: fMain }, defaultPackages: [], entryFileId: idMain, previewType: 'none' }
    }
  }
}

// ─── Preview Type ─────────────────────────────────────────────────────────────

export type PreviewType = 'html-css-js' | 'react-cdn' | 'vue-cdn' | 'markdown' | 'nextjs-server' | 'none'

export function canPreview(pt: PreviewType): boolean {
  return pt !== 'none'
}

// ─── Multi-File Preview Builder ───────────────────────────────────────────────

export function buildWorkspacePreview(
  files: FileSystemMap,
  packages: NpmPackage[],
  previewType: PreviewType
): string {
  const fileNodes = Object.values(files).filter(n => n.type === 'file') as import('./types').FileNode[]

  const cdnScripts = packages
    .filter(p => !['react', 'react-dom', 'vue', 'next'].includes(p.name))
    .map(p => `  <script src="https://unpkg.com/${p.name}@${p.version}"><\/script>`)
    .join('\n')

  switch (previewType) {
    case 'html-css-js': {
      const htmlFile = fileNodes.find(f => f.name === 'index.html')
      const cssFiles = fileNodes.filter(f => f.name.endsWith('.css'))
      const jsFiles = fileNodes.filter(f => f.name.endsWith('.js') && f.name !== 'package.json')
      const allCss = cssFiles.map(f => f.content).join('\n')
      const allJs = jsFiles.map(f => f.content).join('\n')
      const baseHtml = htmlFile?.content ?? '<body></body>'

      let result = baseHtml
      if (allCss) result = result.replace('</head>', `  <style>${allCss}</style>\n</head>`)
      if (cdnScripts) result = result.replace('</body>', `${cdnScripts}\n</body>`)
      if (allJs) result = result.replace('</body>', `  <script>${allJs}<\/script>\n</body>`)
      return result
    }

    case 'react-cdn': {
      const jsxFiles = fileNodes.filter(f => f.name.endsWith('.jsx') || f.name.endsWith('.js'))
      const cssFiles = fileNodes.filter(f => f.name.endsWith('.css'))
      const allCss = cssFiles.map(f => f.content).join('\n')

      // Strip import/export for CDN mode
      const processFile = (content: string): string =>
        content
          .replace(/import\s+.*?from\s+['"][^'"]+['"]\s*;?\n?/g, '')
          .replace(/export\s+default\s+(?=function|class)/g, '')
          .replace(/export\s+default\s+(\w+)\s*;?\s*$/m, '')
          .replace(/\bexport\s+/g, '')

      const allCode = jsxFiles.map(f => processFile(f.content)).join('\n\n')

      // Auto-inject render if missing
      let finalCode = allCode
      if (!allCode.includes('ReactDOM.createRoot') && !allCode.includes('ReactDOM.render')) {
        // Try to find a component name
        const match = allCode.match(/function\s+(\w+)\s*\(/) || allCode.match(/const\s+(\w+)\s*=\s*\(/)
        if (match?.[1]) {
          finalCode += `\n\nReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${match[1]}, null))`
        }
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
${cdnScripts}
  <style>${allCss}</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">${finalCode}<\/script>
</body>
</html>`
    }

    case 'vue-cdn': {
      const jsFiles = fileNodes.filter(f => f.name.endsWith('.js') && !f.name.endsWith('config.js'))
      const cssFiles = fileNodes.filter(f => f.name.endsWith('.css'))
      const allCss = cssFiles.map(f => f.content).join('\n')
      const allJs = jsFiles.map(f => f.content).join('\n')

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
${cdnScripts}
  <style>${allCss}</style>
</head>
<body>
  <div id="app"></div>
  <script>${allJs}<\/script>
</body>
</html>`
    }

    case 'markdown': {
      const mdFile = fileNodes.find(f => f.name.endsWith('.md'))
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    body { font-family: -apple-system, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 24px; color: #1a1a1a; line-height: 1.7; }
    pre { background: #f4f4f4; padding: 16px; border-radius: 6px; overflow-x: auto; }
    code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: .9em; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 16px; color: #555; }
  </style>
</head>
<body>
  <div id="content"></div>
  <script>document.getElementById('content').innerHTML = marked.parse(${JSON.stringify(mdFile?.content ?? '')})<\/script>
</body>
</html>`
    }

    default:
      return ''
  }
}

// ─── Framework Metadata (for landing page) ────────────────────────────────────

export interface FrameworkMeta {
  id: FrameworkTemplate
  name: string
  description: string
  category: 'Frontend' | 'Fullstack' | 'Language'
  icon: string
  color: string
}

export const FRAMEWORK_LIST: FrameworkMeta[] = [
  { id: 'html-css-js', name: 'HTML / CSS / JS', description: 'Web fundamentals, no framework', category: 'Frontend', icon: '🌐', color: '#e34c26' },
  { id: 'react',       name: 'React',           description: 'UI library by Meta',             category: 'Frontend', icon: '⚛️', color: '#61dafb' },
  { id: 'vue',         name: 'Vue 3',           description: 'Progressive JS framework',        category: 'Frontend', icon: '💚', color: '#42b883' },
  { id: 'nextjs',      name: 'Next.js 16',      description: 'React framework for production',  category: 'Fullstack', icon: '▲', color: '#ffffff' },
  { id: 'typescript',  name: 'TypeScript',      description: 'JavaScript with types',           category: 'Language', icon: '🔷', color: '#3178c6' },
  { id: 'python',      name: 'Python',          description: 'General-purpose scripting',       category: 'Language', icon: '🐍', color: '#f7c948' },
  { id: 'rust',        name: 'Rust',            description: 'Systems programming',             category: 'Language', icon: '⚙️', color: '#f74c00' },
  { id: 'go',          name: 'Go',              description: 'Fast compiled language',          category: 'Language', icon: '🐹', color: '#00acd7' },
  { id: 'java',        name: 'Java',            description: 'Enterprise OOP language',         category: 'Language', icon: '☕', color: '#e76f00' },
  { id: 'cpp',         name: 'C / C++',         description: 'Low-level systems programming',   category: 'Language', icon: '⚡', color: '#6295cb' },
  { id: 'php',         name: 'PHP',             description: 'Server-side scripting',           category: 'Language', icon: '🐘', color: '#8892be' },
  { id: 'sql',         name: 'SQL',             description: 'Query language for databases',    category: 'Language', icon: '🗄️', color: '#ff6b6b' },
  { id: 'markdown',    name: 'Markdown',        description: 'Docs with live preview',          category: 'Language', icon: '📝', color: '#aaaaaa' },
]

export const FRAMEWORK_CATEGORIES = ['Frontend', 'Fullstack', 'Language'] as const

export function getPreviewTypeForTemplate(template: FrameworkTemplate): PreviewType {
  const map: Partial<Record<FrameworkTemplate, PreviewType>> = {
    'html-css-js': 'html-css-js',
    'react': 'react-cdn',
    'vue': 'vue-cdn',
    'markdown': 'markdown',
    'nextjs': 'nextjs-server',
  }
  return map[template] ?? 'none'
}
