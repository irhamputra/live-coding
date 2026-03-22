(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/templates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FRAMEWORK_CATEGORIES",
    ()=>FRAMEWORK_CATEGORIES,
    "FRAMEWORK_LIST",
    ()=>FRAMEWORK_LIST,
    "buildInitialFiles",
    ()=>buildInitialFiles,
    "buildWorkspacePreview",
    ()=>buildWorkspacePreview,
    "canPreview",
    ()=>canPreview,
    "getLanguageFromFilename",
    ()=>getLanguageFromFilename,
    "getPreviewTypeForTemplate",
    ()=>getPreviewTypeForTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
;
function getLanguageFromFilename(name) {
    const ext = name.split('.').pop()?.toLowerCase() ?? '';
    const map = {
        html: 'html',
        css: 'css',
        js: 'javascript',
        jsx: 'jsx',
        ts: 'typescript',
        tsx: 'tsx',
        py: 'python',
        rs: 'rust',
        java: 'java',
        go: 'go',
        cpp: 'cpp',
        c: 'cpp',
        h: 'cpp',
        php: 'php',
        sql: 'sql',
        md: 'markdown',
        json: 'javascript',
        vue: 'vue'
    };
    return map[ext] ?? 'plaintext';
}
// ─── Template Builder ─────────────────────────────────────────────────────────
function f(name, content, parentId = null) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    return [
        id,
        {
            id,
            type: 'file',
            name,
            parentId,
            content
        }
    ];
}
function dir(name, parentId = null) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    return [
        id,
        {
            id,
            type: 'directory',
            name,
            parentId
        }
    ];
}
function pkgJson(projectName, deps) {
    return JSON.stringify({
        name: projectName,
        version: '1.0.0',
        private: true,
        dependencies: deps
    }, null, 2);
}
function buildInitialFiles(template, projectName) {
    switch(template){
        case 'html-css-js':
            {
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
</html>`);
                const [idCss, fCss] = f('style.css', `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 40px;
  background: #f5f5f5;
  color: #333;
}

h1 { margin-bottom: 12px; color: #1a1a1a; }
p  { color: #666; }`);
                const [idJs, fJs] = f('script.js', `console.log('Hello from ${projectName}!');`);
                const [idPkg, fPkg] = f('package.json', pkgJson(projectName, {}));
                return {
                    files: {
                        [idHtml]: fHtml,
                        [idCss]: fCss,
                        [idJs]: fJs,
                        [idPkg]: fPkg
                    },
                    defaultPackages: [],
                    entryFileId: idHtml,
                    previewType: 'html-css-js'
                };
            }
        case 'react':
            {
                const [idSrc, dSrc] = dir('src');
                const [idApp, fApp] = f('App.jsx', `export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1>Hello from React!</h1>
      <p>Edit <code>src/App.jsx</code> to get started.</p>
    </div>
  )
}`, dSrc.id);
                const [idMain, fMain] = f('main.jsx', `import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)`, dSrc.id);
                const [idCss, fCss] = f('style.css', `body { margin: 0; font-family: sans-serif; }`);
                const [idPkg, fPkg] = f('package.json', pkgJson(projectName, {
                    react: '^18.3.1',
                    'react-dom': '^18.3.1'
                }));
                return {
                    files: {
                        [idSrc]: dSrc,
                        [idApp]: fApp,
                        [idMain]: fMain,
                        [idCss]: fCss,
                        [idPkg]: fPkg
                    },
                    defaultPackages: [
                        {
                            name: 'react',
                            version: '18.3.1'
                        },
                        {
                            name: 'react-dom',
                            version: '18.3.1'
                        }
                    ],
                    entryFileId: idApp,
                    previewType: 'react-cdn'
                };
            }
        case 'vue':
            {
                const [idSrc, dSrc] = dir('src');
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
}).mount('#app')`, dSrc.id);
                const [idCss, fCss] = f('style.css', `body { margin: 0; font-family: sans-serif; }`);
                const [idPkg, fPkg] = f('package.json', pkgJson(projectName, {
                    vue: '^3.5.0'
                }));
                return {
                    files: {
                        [idSrc]: dSrc,
                        [idApp]: fApp,
                        [idCss]: fCss,
                        [idPkg]: fPkg
                    },
                    defaultPackages: [
                        {
                            name: 'vue',
                            version: '3.5.0'
                        }
                    ],
                    entryFileId: idApp,
                    previewType: 'vue-cdn'
                };
            }
        case 'nextjs':
            {
                const [idApp, dApp] = dir('app');
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
}`, dApp.id);
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
}`, dApp.id);
                const [idConfig, fConfig] = f('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig`);
                const [idTs, fTs] = f('tsconfig.json', JSON.stringify({
                    compilerOptions: {
                        target: 'ES2017',
                        lib: [
                            'dom',
                            'dom.iterable',
                            'esnext'
                        ],
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
                        paths: {
                            '@/*': [
                                './*'
                            ]
                        }
                    },
                    include: [
                        'next-env.d.ts',
                        '**/*.ts',
                        '**/*.tsx',
                        '.next/types/**/*.ts'
                    ],
                    exclude: [
                        'node_modules'
                    ]
                }, null, 2));
                const [idPkg, fPkg] = f('package.json', JSON.stringify({
                    name: projectName.toLowerCase().replace(/\s+/g, '-'),
                    version: '0.1.0',
                    private: true,
                    scripts: {
                        dev: 'next dev',
                        build: 'next build',
                        start: 'next start'
                    },
                    dependencies: {
                        next: '^16.2.1',
                        react: '^19.2.4',
                        'react-dom': '^19.2.4'
                    },
                    devDependencies: {
                        typescript: '^5',
                        '@types/node': '^20',
                        '@types/react': '^19',
                        '@types/react-dom': '^19'
                    }
                }, null, 2));
                return {
                    files: {
                        [idApp]: dApp,
                        [idPage]: fPage,
                        [idLayout]: fLayout,
                        [idConfig]: fConfig,
                        [idTs]: fTs,
                        [idPkg]: fPkg
                    },
                    defaultPackages: [
                        {
                            name: 'next',
                            version: '16.2.1'
                        },
                        {
                            name: 'react',
                            version: '19.2.4'
                        }
                    ],
                    entryFileId: idPage,
                    previewType: 'nextjs-server'
                };
            }
        case 'typescript':
            {
                const [idMain, fMain] = f('main.ts', `interface User {
  name: string
  age: number
}

function greet(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`
}

const user: User = { name: '${projectName}', age: 25 }
console.log(greet(user))`);
                const [idPkg, fPkg] = f('package.json', pkgJson(projectName, {
                    typescript: '^5.7.3'
                }));
                return {
                    files: {
                        [idMain]: fMain,
                        [idPkg]: fPkg
                    },
                    defaultPackages: [],
                    entryFileId: idMain,
                    previewType: 'none'
                };
            }
        case 'python':
            {
                const [idMain, fMain] = f('main.py', `def greet(name: str) -> str:
    return f"Hello, {name}!"


if __name__ == "__main__":
    print(greet("${projectName}"))`);
                const [idReq, fReq] = f('requirements.txt', `# Add your Python packages here\n# e.g. requests==2.31.0`);
                return {
                    files: {
                        [idMain]: fMain,
                        [idReq]: fReq
                    },
                    defaultPackages: [],
                    entryFileId: idMain,
                    previewType: 'none'
                };
            }
        case 'rust':
            {
                const [idMain, fMain] = f('main.rs', `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("{}", greet("${projectName}"));
}`);
                const [idCargo, fCargo] = f('Cargo.toml', `[package]\nname = "${projectName.replace(/\s+/g, '-').toLowerCase()}"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]`);
                return {
                    files: {
                        [idMain]: fMain,
                        [idCargo]: fCargo
                    },
                    defaultPackages: [],
                    entryFileId: idMain,
                    previewType: 'none'
                };
            }
        case 'go':
            {
                const [idMain, fMain] = f('main.go', `package main

import "fmt"

func greet(name string) string {
\treturn fmt.Sprintf("Hello, %s!", name)
}

func main() {
\tfmt.Println(greet("${projectName}"))
}`);
                const [idMod, fMod] = f('go.mod', `module ${projectName.replace(/\s+/g, '-').toLowerCase()}\n\ngo 1.22`);
                return {
                    files: {
                        [idMain]: fMain,
                        [idMod]: fMod
                    },
                    defaultPackages: [],
                    entryFileId: idMain,
                    previewType: 'none'
                };
            }
        case 'java':
            {
                const [idMain, fMain] = f('Main.java', `public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) {
        System.out.println(greet("${projectName}"));
    }
}`);
                return {
                    files: {
                        [idMain]: fMain
                    },
                    defaultPackages: [],
                    entryFileId: idMain,
                    previewType: 'none'
                };
            }
        case 'cpp':
            {
                const [idMain, fMain] = f('main.cpp', `#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::cout << greet("${projectName}") << std::endl;
    return 0;
}`);
                return {
                    files: {
                        [idMain]: fMain
                    },
                    defaultPackages: [],
                    entryFileId: idMain,
                    previewType: 'none'
                };
            }
        case 'php':
            {
                const [idMain, fMain] = f('index.php', `<?php

function greet(string $name): string {
    return "Hello, $name!";
}

echo greet("${projectName}");`);
                return {
                    files: {
                        [idMain]: fMain
                    },
                    defaultPackages: [],
                    entryFileId: idMain,
                    previewType: 'none'
                };
            }
        case 'sql':
            {
                const [idMain, fMain] = f('query.sql', `-- ${projectName}

CREATE TABLE users (
  id    INT PRIMARY KEY AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com'),
       ('Bob',   'bob@example.com');

SELECT * FROM users ORDER BY name;`);
                return {
                    files: {
                        [idMain]: fMain
                    },
                    defaultPackages: [],
                    entryFileId: idMain,
                    previewType: 'none'
                };
            }
        case 'markdown':
            {
                const [idMain, fMain] = f('README.md', `# ${projectName}

A collaborative documentation project.

## Getting Started

Write your **Markdown** here. The preview updates in real time.

## Features

- Live preview
- Real-time collaboration
- Syntax highlighting

> Edit this file to get started!`);
                return {
                    files: {
                        [idMain]: fMain
                    },
                    defaultPackages: [],
                    entryFileId: idMain,
                    previewType: 'markdown'
                };
            }
        default:
            {
                const [idMain, fMain] = f('index.html', `<h1>Hello, ${projectName}!</h1>`);
                return {
                    files: {
                        [idMain]: fMain
                    },
                    defaultPackages: [],
                    entryFileId: idMain,
                    previewType: 'none'
                };
            }
    }
}
function canPreview(pt) {
    return pt !== 'none';
}
function buildWorkspacePreview(files, packages, previewType) {
    const fileNodes = Object.values(files).filter((n)=>n.type === 'file');
    const cdnScripts = packages.filter((p)=>![
            'react',
            'react-dom',
            'vue',
            'next'
        ].includes(p.name)).map((p)=>`  <script src="https://unpkg.com/${p.name}@${p.version}"><\/script>`).join('\n');
    switch(previewType){
        case 'html-css-js':
            {
                const htmlFile = fileNodes.find((f)=>f.name === 'index.html');
                const cssFiles = fileNodes.filter((f)=>f.name.endsWith('.css'));
                const jsFiles = fileNodes.filter((f)=>f.name.endsWith('.js') && f.name !== 'package.json');
                const allCss = cssFiles.map((f)=>f.content).join('\n');
                const allJs = jsFiles.map((f)=>f.content).join('\n');
                const baseHtml = htmlFile?.content ?? '<body></body>';
                let result = baseHtml;
                if (allCss) result = result.replace('</head>', `  <style>${allCss}</style>\n</head>`);
                if (cdnScripts) result = result.replace('</body>', `${cdnScripts}\n</body>`);
                if (allJs) result = result.replace('</body>', `  <script>${allJs}<\/script>\n</body>`);
                return result;
            }
        case 'react-cdn':
            {
                const jsxFiles = fileNodes.filter((f)=>f.name.endsWith('.jsx') || f.name.endsWith('.js'));
                const cssFiles = fileNodes.filter((f)=>f.name.endsWith('.css'));
                const allCss = cssFiles.map((f)=>f.content).join('\n');
                // Strip import/export for CDN mode
                const processFile = (content)=>content.replace(/import\s+.*?from\s+['"][^'"]+['"]\s*;?\n?/g, '').replace(/export\s+default\s+(?=function|class)/g, '').replace(/export\s+default\s+(\w+)\s*;?\s*$/m, '').replace(/\bexport\s+/g, '');
                const allCode = jsxFiles.map((f)=>processFile(f.content)).join('\n\n');
                // Auto-inject render if missing
                let finalCode = allCode;
                if (!allCode.includes('ReactDOM.createRoot') && !allCode.includes('ReactDOM.render')) {
                    // Try to find a component name
                    const match = allCode.match(/function\s+(\w+)\s*\(/) || allCode.match(/const\s+(\w+)\s*=\s*\(/);
                    if (match?.[1]) {
                        finalCode += `\n\nReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${match[1]}, null))`;
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
</html>`;
            }
        case 'vue-cdn':
            {
                const jsFiles = fileNodes.filter((f)=>f.name.endsWith('.js') && !f.name.endsWith('config.js'));
                const cssFiles = fileNodes.filter((f)=>f.name.endsWith('.css'));
                const allCss = cssFiles.map((f)=>f.content).join('\n');
                const allJs = jsFiles.map((f)=>f.content).join('\n');
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
</html>`;
            }
        case 'markdown':
            {
                const mdFile = fileNodes.find((f)=>f.name.endsWith('.md'));
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
</html>`;
            }
        default:
            return '';
    }
}
const FRAMEWORK_LIST = [
    {
        id: 'html-css-js',
        name: 'HTML / CSS / JS',
        description: 'Web fundamentals, no framework',
        category: 'Frontend',
        icon: '🌐',
        color: '#e34c26'
    },
    {
        id: 'react',
        name: 'React',
        description: 'UI library by Meta',
        category: 'Frontend',
        icon: '⚛️',
        color: '#61dafb'
    },
    {
        id: 'vue',
        name: 'Vue 3',
        description: 'Progressive JS framework',
        category: 'Frontend',
        icon: '💚',
        color: '#42b883'
    },
    {
        id: 'nextjs',
        name: 'Next.js 16',
        description: 'React framework for production',
        category: 'Fullstack',
        icon: '▲',
        color: '#ffffff'
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        description: 'JavaScript with types',
        category: 'Language',
        icon: '🔷',
        color: '#3178c6'
    },
    {
        id: 'python',
        name: 'Python',
        description: 'General-purpose scripting',
        category: 'Language',
        icon: '🐍',
        color: '#f7c948'
    },
    {
        id: 'rust',
        name: 'Rust',
        description: 'Systems programming',
        category: 'Language',
        icon: '⚙️',
        color: '#f74c00'
    },
    {
        id: 'go',
        name: 'Go',
        description: 'Fast compiled language',
        category: 'Language',
        icon: '🐹',
        color: '#00acd7'
    },
    {
        id: 'java',
        name: 'Java',
        description: 'Enterprise OOP language',
        category: 'Language',
        icon: '☕',
        color: '#e76f00'
    },
    {
        id: 'cpp',
        name: 'C / C++',
        description: 'Low-level systems programming',
        category: 'Language',
        icon: '⚡',
        color: '#6295cb'
    },
    {
        id: 'php',
        name: 'PHP',
        description: 'Server-side scripting',
        category: 'Language',
        icon: '🐘',
        color: '#8892be'
    },
    {
        id: 'sql',
        name: 'SQL',
        description: 'Query language for databases',
        category: 'Language',
        icon: '🗄️',
        color: '#ff6b6b'
    },
    {
        id: 'markdown',
        name: 'Markdown',
        description: 'Docs with live preview',
        category: 'Language',
        icon: '📝',
        color: '#aaaaaa'
    }
];
const FRAMEWORK_CATEGORIES = [
    'Frontend',
    'Fullstack',
    'Language'
];
function getPreviewTypeForTemplate(template) {
    const map = {
        'html-css-js': 'html-css-js',
        'react': 'react-cdn',
        'vue': 'vue-cdn',
        'markdown': 'markdown',
        'nextjs': 'nextjs-server'
    };
    return map[template] ?? 'none';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/FileTree.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FileTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
function buildTree(files, parentId) {
    return Object.values(files).filter((n)=>n.parentId === parentId).sort((a, b)=>{
        if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
        return a.name.localeCompare(b.name);
    }).map((node)=>({
            node,
            children: node.type === 'directory' ? buildTree(files, node.id) : []
        }));
}
function fileIcon(name, isDir) {
    if (isDir) return '📁';
    const ext = name.split('.').pop()?.toLowerCase();
    const icons = {
        html: '🌐',
        css: '🎨',
        js: '⚡',
        jsx: '⚛️',
        ts: '🔷',
        tsx: '⚛️',
        py: '🐍',
        rs: '⚙️',
        java: '☕',
        go: '🐹',
        cpp: '⚡',
        c: '⚡',
        php: '🐘',
        sql: '🗄️',
        md: '📝',
        json: '📋',
        toml: '📋',
        txt: '📄',
        sh: '💻',
        vue: '💚'
    };
    return icons[ext ?? ''] ?? '📄';
}
function NodeRow({ treeNode, depth, activeFileId, onFileSelect, onFileCreate, onFileDelete, onFileRename }) {
    _s();
    const { node, children } = treeNode;
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [renaming, setRenaming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [renameValue, setRenameValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(node.name);
    const [showNewInput, setShowNewInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newName, setNewName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const renameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const newRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isActive = node.type === 'file' && node.id === activeFileId;
    const commitRename = ()=>{
        const trimmed = renameValue.trim();
        if (trimmed && trimmed !== node.name) onFileRename(node.id, trimmed);
        setRenaming(false);
    };
    const commitNew = (type)=>{
        const trimmed = newName.trim();
        if (trimmed) onFileCreate(node.type === 'directory' ? node.id : node.parentId, type, trimmed);
        setShowNewInput(null);
        setNewName('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `tree-row ${isActive ? 'tree-row--active' : ''}`,
                style: {
                    paddingLeft: depth * 14 + 8
                },
                onClick: ()=>{
                    if (node.type === 'file') onFileSelect(node.id);
                    else setIsOpen((o)=>!o);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tree-row__icon",
                        children: [
                            node.type === 'directory' ? isOpen ? '▾' : '▸' : '',
                            fileIcon(node.name, node.type === 'directory')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/FileTree.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    renaming ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: renameRef,
                        className: "tree-rename-input",
                        value: renameValue,
                        autoFocus: true,
                        onChange: (e)=>setRenameValue(e.target.value),
                        onBlur: commitRename,
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') commitRename();
                            if (e.key === 'Escape') setRenaming(false);
                        },
                        onClick: (e)=>e.stopPropagation()
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/FileTree.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tree-row__name",
                        children: node.name
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/FileTree.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tree-row__actions",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            node.type === 'directory' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        title: "New file",
                                        onClick: ()=>{
                                            setShowNewInput('file');
                                            setIsOpen(true);
                                        },
                                        children: "+📄"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/FileTree.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        title: "New folder",
                                        onClick: ()=>{
                                            setShowNewInput('directory');
                                            setIsOpen(true);
                                        },
                                        children: "+📁"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/FileTree.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                title: "Rename",
                                onClick: ()=>{
                                    setRenaming(true);
                                    setRenameValue(node.name);
                                },
                                children: "✏️"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/FileTree.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                title: "Delete",
                                onClick: ()=>{
                                    if (window.confirm(`Delete "${node.name}"?`)) onFileDelete(node.id);
                                },
                                children: "🗑️"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/FileTree.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/FileTree.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/FileTree.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            node.type === 'directory' && isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    showNewInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            paddingLeft: (depth + 1) * 14 + 8
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: newRef,
                            className: "tree-rename-input",
                            placeholder: showNewInput === 'file' ? 'filename.js' : 'folder-name',
                            value: newName,
                            autoFocus: true,
                            onChange: (e)=>setNewName(e.target.value),
                            onBlur: ()=>commitNew(showNewInput),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter') commitNew(showNewInput);
                                if (e.key === 'Escape') {
                                    setShowNewInput(null);
                                    setNewName('');
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/FileTree.tsx",
                            lineNumber: 120,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/FileTree.tsx",
                        lineNumber: 119,
                        columnNumber: 13
                    }, this),
                    children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NodeRow, {
                            treeNode: child,
                            depth: depth + 1,
                            activeFileId: activeFileId,
                            onFileSelect: onFileSelect,
                            onFileCreate: onFileCreate,
                            onFileDelete: onFileDelete,
                            onFileRename: onFileRename
                        }, child.node.id, false, {
                            fileName: "[project]/components/workspace/FileTree.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/workspace/FileTree.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(NodeRow, "DhfBNqiSBYyHbckpdJpjY07JAl8=");
_c = NodeRow;
function FileTree({ files, activeFileId, onFileSelect, onFileCreate, onFileDelete, onFileRename }) {
    _s1();
    const [newRootInput, setNewRootInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newRootName, setNewRootName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const rootTree = buildTree(files, null);
    const commitRoot = (type)=>{
        const trimmed = newRootName.trim();
        if (trimmed) onFileCreate(null, type, trimmed);
        setNewRootInput(null);
        setNewRootName('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "file-tree",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "file-tree__header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "FILES"
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/FileTree.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "file-tree__header-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                title: "New file",
                                onClick: ()=>setNewRootInput('file'),
                                children: "+📄"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/FileTree.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                title: "New folder",
                                onClick: ()=>setNewRootInput('directory'),
                                children: "+📁"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/FileTree.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/FileTree.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/FileTree.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            newRootInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '4px 8px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: "tree-rename-input",
                    placeholder: newRootInput === 'file' ? 'filename.js' : 'folder-name',
                    value: newRootName,
                    autoFocus: true,
                    onChange: (e)=>setNewRootName(e.target.value),
                    onBlur: ()=>commitRoot(newRootInput),
                    onKeyDown: (e)=>{
                        if (e.key === 'Enter') commitRoot(newRootInput);
                        if (e.key === 'Escape') {
                            setNewRootInput(null);
                            setNewRootName('');
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/components/workspace/FileTree.tsx",
                    lineNumber: 174,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/workspace/FileTree.tsx",
                lineNumber: 173,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "file-tree__body",
                children: rootTree.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NodeRow, {
                        treeNode: child,
                        depth: 0,
                        activeFileId: activeFileId,
                        onFileSelect: onFileSelect,
                        onFileCreate: onFileCreate,
                        onFileDelete: onFileDelete,
                        onFileRename: onFileRename
                    }, child.node.id, false, {
                        fileName: "[project]/components/workspace/FileTree.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/workspace/FileTree.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/workspace/FileTree.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
_s1(FileTree, "GAP3qr6hh+8a2K8t7YSA593wlzo=");
_c1 = FileTree;
var _c, _c1;
__turbopack_context__.k.register(_c, "NodeRow");
__turbopack_context__.k.register(_c1, "FileTree");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/CodeEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CodeEditor,
    "setEditorContent",
    ()=>setEditorContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uiw$2f$react$2d$codemirror$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@uiw/react-codemirror/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$view$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/view/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$theme$2d$one$2d$dark$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/theme-one-dark/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$html$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-html/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$css$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-css/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$javascript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-javascript/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$python$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-python/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$rust$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-rust/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$java$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-java/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$cpp$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-cpp/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$php$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-php/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$sql$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-sql/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$markdown$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-markdown/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$language$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/language/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$legacy$2d$modes$2f$mode$2f$go$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/legacy-modes/mode/go.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function getExtensions(filename) {
    const ext = filename.split('.').pop()?.toLowerCase() ?? '';
    const wrap = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$view$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorView"].lineWrapping;
    switch(ext){
        case 'html':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$html$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["html"])(),
                wrap
            ];
        case 'css':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$css$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(),
                wrap
            ];
        case 'js':
        case 'mjs':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$javascript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["javascript"])(),
                wrap
            ];
        case 'jsx':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$javascript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["javascript"])({
                    jsx: true
                }),
                wrap
            ];
        case 'ts':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$javascript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["javascript"])({
                    typescript: true
                }),
                wrap
            ];
        case 'tsx':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$javascript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["javascript"])({
                    jsx: true,
                    typescript: true
                }),
                wrap
            ];
        case 'py':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$python$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["python"])(),
                wrap
            ];
        case 'rs':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$rust$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rust"])(),
                wrap
            ];
        case 'java':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$java$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["java"])(),
                wrap
            ];
        case 'cpp':
        case 'c':
        case 'h':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$cpp$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cpp"])(),
                wrap
            ];
        case 'go':
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$language$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StreamLanguage"].define(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$legacy$2d$modes$2f$mode$2f$go$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["go"]),
                wrap
            ];
        case 'php':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$php$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["php"])(),
                wrap
            ];
        case 'sql':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$sql$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sql"])(),
                wrap
            ];
        case 'md':
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$markdown$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markdown"])(),
                wrap
            ];
        default:
            return [
                wrap
            ];
    }
}
function CodeEditor({ fileId, filename, initialContent, onChange, editorRef }) {
    const extensions = getExtensions(filename);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uiw$2f$react$2d$codemirror$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
        ref: editorRef,
        defaultValue: initialContent,
        extensions: extensions,
        theme: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$theme$2d$one$2d$dark$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["oneDark"],
        onChange: onChange,
        basicSetup: {
            lineNumbers: true,
            foldGutter: true
        },
        style: {
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
        },
        className: "code-mirror-fill"
    }, fileId, false, {
        fileName: "[project]/components/workspace/CodeEditor.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c = CodeEditor;
function setEditorContent(ref, content) {
    const view = ref.current?.view;
    if (!view) return;
    view.dispatch({
        changes: {
            from: 0,
            to: view.state.doc.length,
            insert: content
        }
    });
}
var _c;
__turbopack_context__.k.register(_c, "CodeEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/PreviewPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PreviewPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function PreviewPanel({ files, packages, previewType, serverUrl, serverReady }) {
    _s();
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PreviewPanel.useMemo[html]": ()=>previewType !== 'nextjs-server' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildWorkspacePreview"])(files, packages, previewType) : ''
    }["PreviewPanel.useMemo[html]"], [
        files,
        packages,
        previewType
    ]);
    if (previewType === 'none') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "preview-empty",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "preview-empty__icon",
                    children: "🖥️"
                }, void 0, false, {
                    fileName: "[project]/components/workspace/PreviewPanel.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "preview-empty__text",
                    children: "No live preview for this language"
                }, void 0, false, {
                    fileName: "[project]/components/workspace/PreviewPanel.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/workspace/PreviewPanel.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this);
    }
    if (previewType === 'nextjs-server') {
        if (!serverReady || !serverUrl) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "preview-starting",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "preview-starting__spinner"
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/PreviewPanel.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "preview-starting__text",
                        children: "Starting Next.js server…"
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/PreviewPanel.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "preview-starting__sub",
                        children: "This may take 10–20 seconds"
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/PreviewPanel.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/PreviewPanel.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
            className: "preview-frame",
            src: serverUrl,
            title: "Next.js Preview"
        }, void 0, false, {
            fileName: "[project]/components/workspace/PreviewPanel.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
        className: "preview-frame",
        srcDoc: html,
        sandbox: "allow-scripts allow-same-origin",
        title: "Preview"
    }, void 0, false, {
        fileName: "[project]/components/workspace/PreviewPanel.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(PreviewPanel, "OtathaP3BKVCXaZtVNvoS+3QIcY=");
_c = PreviewPanel;
var _c;
__turbopack_context__.k.register(_c, "PreviewPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/WorkspaceLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkspaceLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$FileTree$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/FileTree.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$CodeEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/CodeEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$PreviewPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/PreviewPanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function getDescendants(files, nodeId) {
    const result = [];
    for (const [id, node] of Object.entries(files)){
        if (node.parentId === nodeId) {
            result.push(id);
            result.push(...getDescendants(files, id));
        }
    }
    return result;
}
function WorkspaceLayout({ roomId }) {
    _s();
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [packages, setPackages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeFileId, setActiveFileId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [openTabs, setOpenTabs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [projectName, setProjectName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [previewType, setPreviewType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('none');
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [notFound, setNotFound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [serverPort, setServerPort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [serverReady, setServerReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [serverError, setServerError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pkgSearch, setPkgSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [pkgResults, setPkgResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showPkgSearch, setShowPkgSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const senderIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])());
    const editorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeFileIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const updateTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pkgSearchTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceLayout.useEffect": ()=>{
            activeFileIdRef.current = activeFileId;
        }
    }["WorkspaceLayout.useEffect"], [
        activeFileId
    ]);
    // ── Socket setup ────────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceLayout.useEffect": ()=>{
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])();
            socketRef.current = socket;
            socket.on('connect', {
                "WorkspaceLayout.useEffect": ()=>{
                    socket.emit('room:join', roomId, {
                        "WorkspaceLayout.useEffect": (state)=>{
                            if (!state) {
                                setNotFound(true);
                                return;
                            }
                            setFiles(state.files);
                            setPackages(state.packages);
                            setProjectName(state.projectName);
                            setPreviewType((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreviewTypeForTemplate"])(state.template));
                            if (state.serverPort) setServerPort(state.serverPort);
                            if (state.serverReady) setServerReady(true);
                            // Open the designated entry file, or fall back to the first file
                            const entryId = state.entryFileId ?? Object.values(state.files).find({
                                "WorkspaceLayout.useEffect": (n)=>n.type === 'file'
                            }["WorkspaceLayout.useEffect"])?.id;
                            if (entryId) {
                                setActiveFileId(entryId);
                                setOpenTabs([
                                    entryId
                                ]);
                            }
                            setConnected(true);
                        }
                    }["WorkspaceLayout.useEffect"]);
                }
            }["WorkspaceLayout.useEffect"]);
            socket.on('file:updated', {
                "WorkspaceLayout.useEffect": ({ fileId, content, senderId })=>{
                    if (senderId === senderIdRef.current) return;
                    setFiles({
                        "WorkspaceLayout.useEffect": (prev)=>{
                            const node = prev[fileId];
                            if (!node || node.type !== 'file') return prev;
                            return {
                                ...prev,
                                [fileId]: {
                                    ...node,
                                    content
                                }
                            };
                        }
                    }["WorkspaceLayout.useEffect"]);
                    if (fileId === activeFileIdRef.current) (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$CodeEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setEditorContent"])(editorRef, content);
                }
            }["WorkspaceLayout.useEffect"]);
            socket.on('file:created', {
                "WorkspaceLayout.useEffect": ({ node })=>{
                    setFiles({
                        "WorkspaceLayout.useEffect": (prev)=>({
                                ...prev,
                                [node.id]: node
                            })
                    }["WorkspaceLayout.useEffect"]);
                }
            }["WorkspaceLayout.useEffect"]);
            socket.on('file:deleted', {
                "WorkspaceLayout.useEffect": ({ nodeId })=>{
                    setFiles({
                        "WorkspaceLayout.useEffect": (prev)=>{
                            const next = {
                                ...prev
                            };
                            for (const id of [
                                ...getDescendants(prev, nodeId),
                                nodeId
                            ])delete next[id];
                            return next;
                        }
                    }["WorkspaceLayout.useEffect"]);
                    setOpenTabs({
                        "WorkspaceLayout.useEffect": (prev)=>prev.filter({
                                "WorkspaceLayout.useEffect": (id)=>id !== nodeId
                            }["WorkspaceLayout.useEffect"])
                    }["WorkspaceLayout.useEffect"]);
                    setActiveFileId({
                        "WorkspaceLayout.useEffect": (prev)=>prev === nodeId ? null : prev
                    }["WorkspaceLayout.useEffect"]);
                }
            }["WorkspaceLayout.useEffect"]);
            socket.on('file:renamed', {
                "WorkspaceLayout.useEffect": ({ nodeId, newName })=>{
                    setFiles({
                        "WorkspaceLayout.useEffect": (prev)=>{
                            const node = prev[nodeId];
                            if (!node) return prev;
                            return {
                                ...prev,
                                [nodeId]: {
                                    ...node,
                                    name: newName
                                }
                            };
                        }
                    }["WorkspaceLayout.useEffect"]);
                }
            }["WorkspaceLayout.useEffect"]);
            socket.on('package:added', {
                "WorkspaceLayout.useEffect": ({ pkg })=>{
                    setPackages({
                        "WorkspaceLayout.useEffect": (prev)=>prev.find({
                                "WorkspaceLayout.useEffect": (p)=>p.name === pkg.name
                            }["WorkspaceLayout.useEffect"]) ? prev : [
                                ...prev,
                                pkg
                            ]
                    }["WorkspaceLayout.useEffect"]);
                }
            }["WorkspaceLayout.useEffect"]);
            socket.on('package:removed', {
                "WorkspaceLayout.useEffect": ({ packageName })=>{
                    setPackages({
                        "WorkspaceLayout.useEffect": (prev)=>prev.filter({
                                "WorkspaceLayout.useEffect": (p)=>p.name !== packageName
                            }["WorkspaceLayout.useEffect"])
                    }["WorkspaceLayout.useEffect"]);
                }
            }["WorkspaceLayout.useEffect"]);
            socket.on('server:ready', {
                "WorkspaceLayout.useEffect": ()=>setServerReady(true)
            }["WorkspaceLayout.useEffect"]);
            socket.on('server:error', {
                "WorkspaceLayout.useEffect": (msg)=>setServerError(msg)
            }["WorkspaceLayout.useEffect"]);
            return ({
                "WorkspaceLayout.useEffect": ()=>{
                    socket.disconnect();
                }
            })["WorkspaceLayout.useEffect"];
        }
    }["WorkspaceLayout.useEffect"], [
        roomId
    ]);
    // ── Package search ──────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceLayout.useEffect": ()=>{
            if (!pkgSearch.trim()) {
                setPkgResults([]);
                return;
            }
            if (pkgSearchTimer.current) clearTimeout(pkgSearchTimer.current);
            pkgSearchTimer.current = setTimeout({
                "WorkspaceLayout.useEffect": async ()=>{
                    try {
                        const res = await fetch(`https://registry.npmjs.org/search/suggestions?q=${encodeURIComponent(pkgSearch)}&size=6`);
                        const data = await res.json();
                        setPkgResults(data.map({
                            "WorkspaceLayout.useEffect": (p)=>({
                                    name: p.name,
                                    version: p.version
                                })
                        }["WorkspaceLayout.useEffect"]));
                    } catch  {
                        setPkgResults([]);
                    }
                }
            }["WorkspaceLayout.useEffect"], 300);
        }
    }["WorkspaceLayout.useEffect"], [
        pkgSearch
    ]);
    // ── File handlers ───────────────────────────────────────────────────────────
    const handleFileSelect = (fileId)=>{
        setActiveFileId(fileId);
        setOpenTabs((prev)=>prev.includes(fileId) ? prev : [
                ...prev,
                fileId
            ]);
    };
    const closeTab = (tabId)=>{
        const nextTabs = openTabs.filter((id)=>id !== tabId);
        setOpenTabs(nextTabs);
        if (activeFileId === tabId) {
            const idx = openTabs.indexOf(tabId);
            setActiveFileId(nextTabs[Math.max(0, idx - 1)] ?? null);
        }
    };
    const handleFileChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceLayout.useCallback[handleFileChange]": (content)=>{
            const fileId = activeFileIdRef.current;
            if (!fileId) return;
            if (updateTimer.current) clearTimeout(updateTimer.current);
            updateTimer.current = setTimeout({
                "WorkspaceLayout.useCallback[handleFileChange]": ()=>{
                    setFiles({
                        "WorkspaceLayout.useCallback[handleFileChange]": (prev)=>{
                            const node = prev[fileId];
                            if (!node || node.type !== 'file') return prev;
                            return {
                                ...prev,
                                [fileId]: {
                                    ...node,
                                    content
                                }
                            };
                        }
                    }["WorkspaceLayout.useCallback[handleFileChange]"]);
                    socketRef.current?.emit('file:update', {
                        roomId,
                        fileId,
                        content,
                        senderId: senderIdRef.current
                    });
                }
            }["WorkspaceLayout.useCallback[handleFileChange]"], 300);
        }
    }["WorkspaceLayout.useCallback[handleFileChange]"], [
        roomId
    ]);
    const handleFileCreate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceLayout.useCallback[handleFileCreate]": (parentId, type, name)=>{
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            const node = type === 'file' ? {
                id,
                type: 'file',
                name,
                parentId,
                content: ''
            } : {
                id,
                type: 'directory',
                name,
                parentId
            };
            setFiles({
                "WorkspaceLayout.useCallback[handleFileCreate]": (prev)=>({
                        ...prev,
                        [id]: node
                    })
            }["WorkspaceLayout.useCallback[handleFileCreate]"]);
            socketRef.current?.emit('file:create', {
                roomId,
                node,
                senderId: senderIdRef.current
            });
            if (type === 'file') {
                setActiveFileId(id);
                setOpenTabs({
                    "WorkspaceLayout.useCallback[handleFileCreate]": (prev)=>[
                            ...prev,
                            id
                        ]
                }["WorkspaceLayout.useCallback[handleFileCreate]"]);
            }
        }
    }["WorkspaceLayout.useCallback[handleFileCreate]"], [
        roomId
    ]);
    const handleFileDelete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceLayout.useCallback[handleFileDelete]": (nodeId)=>{
            setFiles({
                "WorkspaceLayout.useCallback[handleFileDelete]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    for (const id of [
                        ...getDescendants(prev, nodeId),
                        nodeId
                    ])delete next[id];
                    return next;
                }
            }["WorkspaceLayout.useCallback[handleFileDelete]"]);
            setOpenTabs({
                "WorkspaceLayout.useCallback[handleFileDelete]": (prev)=>prev.filter({
                        "WorkspaceLayout.useCallback[handleFileDelete]": (id)=>id !== nodeId
                    }["WorkspaceLayout.useCallback[handleFileDelete]"])
            }["WorkspaceLayout.useCallback[handleFileDelete]"]);
            setActiveFileId({
                "WorkspaceLayout.useCallback[handleFileDelete]": (prev)=>prev === nodeId ? null : prev
            }["WorkspaceLayout.useCallback[handleFileDelete]"]);
            socketRef.current?.emit('file:delete', {
                roomId,
                nodeId,
                senderId: senderIdRef.current
            });
        }
    }["WorkspaceLayout.useCallback[handleFileDelete]"], [
        roomId
    ]);
    const handleFileRename = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceLayout.useCallback[handleFileRename]": (nodeId, newName)=>{
            setFiles({
                "WorkspaceLayout.useCallback[handleFileRename]": (prev)=>{
                    const node = prev[nodeId];
                    if (!node) return prev;
                    return {
                        ...prev,
                        [nodeId]: {
                            ...node,
                            name: newName
                        }
                    };
                }
            }["WorkspaceLayout.useCallback[handleFileRename]"]);
            socketRef.current?.emit('file:rename', {
                roomId,
                nodeId,
                newName,
                senderId: senderIdRef.current
            });
        }
    }["WorkspaceLayout.useCallback[handleFileRename]"], [
        roomId
    ]);
    // ── Package handlers ────────────────────────────────────────────────────────
    const handlePackageAdd = (name, version)=>{
        const pkg = {
            name,
            version
        };
        setPackages((prev)=>prev.find((p)=>p.name === name) ? prev : [
                ...prev,
                pkg
            ]);
        socketRef.current?.emit('package:add', {
            roomId,
            pkg,
            senderId: senderIdRef.current
        });
        setPkgSearch('');
        setPkgResults([]);
        setShowPkgSearch(false);
    };
    const handlePackageRemove = (packageName)=>{
        setPackages((prev)=>prev.filter((p)=>p.name !== packageName));
        socketRef.current?.emit('package:remove', {
            roomId,
            packageName,
            senderId: senderIdRef.current
        });
    };
    const copyLink = ()=>navigator.clipboard.writeText(window.location.href);
    if (notFound) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ws-not-found",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "Room not found"
                }, void 0, false, {
                    fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "This project doesn't exist or has expired."
                }, void 0, false, {
                    fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "/",
                    children: "← Back to Home"
                }, void 0, false, {
                    fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
            lineNumber: 219,
            columnNumber: 7
        }, this);
    }
    const activeFile = activeFileId ? files[activeFileId] : null;
    const activeFileNode = activeFile?.type === 'file' ? activeFile : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "workspace",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ws-toolbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ws-toolbar__left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/",
                                className: "ws-toolbar__logo",
                                children: "CodeCollab"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            projectName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ws-toolbar__project",
                                children: projectName
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                lineNumber: 236,
                                columnNumber: 27
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ws-toolbar__right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `ws-status${connected ? ' ws-status--on' : ''}`,
                                children: connected ? '● Live' : '○ Connecting...'
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "ws-toolbar__btn",
                                onClick: copyLink,
                                children: "Share 🔗"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ws-body",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ws-sidebar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ws-sidebar__tree",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$FileTree$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    files: files,
                                    activeFileId: activeFileId,
                                    onFileSelect: handleFileSelect,
                                    onFileCreate: handleFileCreate,
                                    onFileDelete: handleFileDelete,
                                    onFileRename: handleFileRename
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                    lineNumber: 251,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ws-packages",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ws-packages__header",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "PACKAGES"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                lineNumber: 264,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowPkgSearch((s)=>!s),
                                                title: "Add package",
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                lineNumber: 265,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                        lineNumber: 263,
                                        columnNumber: 13
                                    }, this),
                                    showPkgSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ws-packages__search-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "ws-packages__input",
                                                value: pkgSearch,
                                                onChange: (e)=>setPkgSearch(e.target.value),
                                                placeholder: "Search npm...",
                                                autoFocus: true
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                lineNumber: 269,
                                                columnNumber: 17
                                            }, this),
                                            pkgResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "ws-packages__dropdown",
                                                children: pkgResults.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        onClick: ()=>handlePackageAdd(r.name, r.version),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ws-packages__pkg-name",
                                                                children: r.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ws-packages__pkg-version",
                                                                children: [
                                                                    "@",
                                                                    r.version
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                                lineNumber: 281,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, r.name, true, {
                                                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                lineNumber: 277,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this),
                                    packages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "ws-packages__list",
                                        children: packages.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "ws-packages__item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ws-packages__item-name",
                                                        children: p.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ws-packages__item-ver",
                                                        children: [
                                                            "@",
                                                            p.version
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handlePackageRemove(p.name),
                                                        title: "Remove",
                                                        children: "×"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, p.name, true, {
                                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                lineNumber: 291,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ws-editor-panel",
                        children: [
                            openTabs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ws-tabs",
                                children: openTabs.map((tabId)=>{
                                    const node = files[tabId];
                                    if (!node || node.type !== 'file') return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `ws-tab${tabId === activeFileId ? ' ws-tab--active' : ''}`,
                                        onClick: ()=>setActiveFileId(tabId),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: node.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                lineNumber: 315,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "ws-tab__close",
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    closeTab(tabId);
                                                },
                                                children: "×"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                                lineNumber: 316,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, tabId, true, {
                                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                        lineNumber: 310,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ws-editor-body",
                                children: activeFileNode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$CodeEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    fileId: activeFileId,
                                    filename: activeFileNode.name,
                                    initialContent: activeFileNode.content,
                                    onChange: handleFileChange,
                                    editorRef: editorRef
                                }, activeFileId, false, {
                                    fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                    lineNumber: 327,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ws-no-file",
                                    children: "Select a file to start editing"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                    lineNumber: 336,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this),
                    previewType !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ws-preview-panel",
                        children: serverError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "preview-server-error",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "preview-server-error__icon",
                                    children: "⚠️"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                    lineNumber: 346,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Failed to start Next.js server"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                    lineNumber: 347,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    children: serverError
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                                    lineNumber: 348,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                            lineNumber: 345,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$PreviewPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            files: files,
                            packages: packages,
                            previewType: previewType,
                            serverUrl: serverPort ? `http://127.0.0.1:${serverPort}` : undefined,
                            serverReady: serverReady
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                            lineNumber: 351,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                        lineNumber: 343,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/workspace/WorkspaceLayout.tsx",
        lineNumber: 231,
        columnNumber: 5
    }, this);
}
_s(WorkspaceLayout, "2s9L2ON2SbLzqmirvVPGwWgy1is=");
_c = WorkspaceLayout;
var _c;
__turbopack_context__.k.register(_c, "WorkspaceLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0d.6.17._.js.map