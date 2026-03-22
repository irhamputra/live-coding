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
"[project]/components/LandingPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LandingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const FEATURES = [
    {
        icon: '⚡',
        label: 'Real-time sync'
    },
    {
        icon: '🌐',
        label: '13 templates'
    },
    {
        icon: '🔗',
        label: 'Instant share'
    },
    {
        icon: '🔑',
        label: 'No sign-up'
    }
];
function LandingPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [projectName, setProjectName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedTemplate, setSelectedTemplate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('react');
    const [creating, setCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingPage.useEffect": ()=>{
            socketRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])();
            return ({
                "LandingPage.useEffect": ()=>{
                    socketRef.current?.disconnect();
                }
            })["LandingPage.useEffect"];
        }
    }["LandingPage.useEffect"], []);
    const createProject = ()=>{
        if (!socketRef.current || creating) return;
        const name = projectName.trim() || 'my-project';
        setCreating(true);
        socketRef.current.emit('room:create', {
            projectName: name,
            template: selectedTemplate,
            packages: []
        }, (state)=>{
            router.push(`/editor/${state.roomId}`);
        });
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') createProject();
    };
    const selectedFw = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FRAMEWORK_LIST"].find((f)=>f.id === selectedTemplate);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "landing",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "landing-hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "landing-hero__bg",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/LandingPage.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "landing-hero__content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "landing-hero__badge",
                                children: "Open Source · Free"
                            }, void 0, false, {
                                fileName: "[project]/components/LandingPage.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "landing-hero__title",
                                children: [
                                    "Code",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "landing-hero__accent",
                                        children: "Collab"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingPage.tsx",
                                        lineNumber: 54,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LandingPage.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "landing-hero__sub",
                                children: [
                                    "Online collaborative IDE. Pick a template, write code,",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/components/LandingPage.tsx",
                                        lineNumber: 57,
                                        columnNumber: 67
                                    }, this),
                                    "share a link — code together instantly."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LandingPage.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "landing-features",
                                children: FEATURES.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "landing-feature",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: f.icon
                                            }, void 0, false, {
                                                fileName: "[project]/components/LandingPage.tsx",
                                                lineNumber: 63,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: f.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/LandingPage.tsx",
                                                lineNumber: 64,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, f.label, true, {
                                        fileName: "[project]/components/LandingPage.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/LandingPage.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LandingPage.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LandingPage.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "landing-main",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "landing-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "landing-section__title",
                                children: "Choose a template"
                            }, void 0, false, {
                                fileName: "[project]/components/LandingPage.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "landing-section__sub",
                                children: "Pick the stack you want to start with. You can add files and packages later."
                            }, void 0, false, {
                                fileName: "[project]/components/LandingPage.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FRAMEWORK_CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "landing-category",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "landing-category__name",
                                            children: cat
                                        }, void 0, false, {
                                            fileName: "[project]/components/LandingPage.tsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "landing-grid",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FRAMEWORK_LIST"].filter((f)=>f.category === cat).map((fw)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: `fw-card${selectedTemplate === fw.id ? ' fw-card--active' : ''}`,
                                                    onClick: ()=>setSelectedTemplate(fw.id),
                                                    style: {
                                                        '--fw-color': fw.color
                                                    },
                                                    "aria-pressed": selectedTemplate === fw.id,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "fw-card__icon",
                                                            children: fw.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/LandingPage.tsx",
                                                            lineNumber: 91,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "fw-card__name",
                                                            children: fw.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/LandingPage.tsx",
                                                            lineNumber: 92,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "fw-card__desc",
                                                            children: fw.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/LandingPage.tsx",
                                                            lineNumber: 93,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, fw.id, true, {
                                                    fileName: "[project]/components/LandingPage.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/LandingPage.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, cat, true, {
                                    fileName: "[project]/components/LandingPage.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LandingPage.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "landing-create-bar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "landing-create-bar__inner",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "landing-create-bar__preview",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "landing-create-bar__fw-icon",
                                            children: selectedFw?.icon
                                        }, void 0, false, {
                                            fileName: "[project]/components/LandingPage.tsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "landing-create-bar__fw-name",
                                            children: selectedFw?.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/LandingPage.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LandingPage.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "landing-create-bar__input",
                                    value: projectName,
                                    onChange: (e)=>setProjectName(e.target.value),
                                    onKeyDown: handleKeyDown,
                                    placeholder: "project-name",
                                    "aria-label": "Project name"
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingPage.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "landing-create-bar__btn",
                                    onClick: createProject,
                                    disabled: creating,
                                    children: creating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "landing-create-bar__spinner"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LandingPage.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this),
                                            "Creating…"
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: "Create Project →"
                                    }, void 0, false)
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingPage.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LandingPage.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/LandingPage.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LandingPage.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "landing-footer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Built with Next.js & Socket.io · Open Source"
                }, void 0, false, {
                    fileName: "[project]/components/LandingPage.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LandingPage.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingPage.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(LandingPage, "saKH+0OoM6JSl70JNfde87nRMw8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LandingPage;
var _c;
__turbopack_context__.k.register(_c, "LandingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0a6uek-._.js.map