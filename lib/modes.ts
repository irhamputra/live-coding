import type { Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
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

const wrap = EditorView.lineWrapping

export type EditorMode =
  | 'html-css-js'
  | 'react'
  | 'vue'
  | 'typescript'
  | 'python'
  | 'rust'
  | 'java'
  | 'cpp'
  | 'go'
  | 'php'
  | 'sql'
  | 'markdown'

export type PanelType = 'multi' | 'single'
export type Category = 'Web' | 'Framework' | 'Language'

export interface ContentState {
  html: string
  css: string
  js: string
  code: string
}

export interface ModeConfig {
  id: EditorMode
  name: string
  category: Category
  type: PanelType
  canPreview: boolean
  extensions: Extension[]
  defaults: ContentState
}

export const MODES: Record<EditorMode, ModeConfig> = {
  'html-css-js': {
    id: 'html-css-js',
    name: 'HTML / CSS / JS',
    category: 'Web',
    type: 'multi',
    canPreview: true,
    extensions: [html(), wrap],
    defaults: { html: '', css: '', js: '', code: '' },
  },

  react: {
    id: 'react',
    name: 'React',
    category: 'Framework',
    type: 'single',
    canPreview: true,
    extensions: [javascript({ jsx: true }), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Hello from React!</h1>
      <p>Edit this code to get started.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
  },

  vue: {
    id: 'vue',
    name: 'Vue 3',
    category: 'Framework',
    type: 'single',
    canPreview: true,
    extensions: [javascript(), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const count = ref(0);
    return { count };
  },
  template: \`
    <div style="font-family: sans-serif; padding: 20px">
      <h1>Hello from Vue!</h1>
      <button @click="count++">Clicked {{ count }} times</button>
    </div>
  \`,
}).mount('#app');`,
    },
  },

  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Language',
    type: 'single',
    canPreview: false,
    extensions: [javascript({ typescript: true }), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

const user: User = { name: 'World', age: 25 };
console.log(greet(user));`,
    },
  },

  python: {
    id: 'python',
    name: 'Python',
    category: 'Language',
    type: 'single',
    canPreview: false,
    extensions: [python(), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `def greet(name: str) -> str:
    return f"Hello, {name}!"

names = ["World", "Python", "Live Coding"]
for name in names:
    print(greet(name))`,
    },
  },

  rust: {
    id: 'rust',
    name: 'Rust',
    category: 'Language',
    type: 'single',
    canPreview: false,
    extensions: [rust(), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    let names = vec!["World", "Rust", "Live Coding"];
    for name in &names {
        println!("{}", greet(name));
    }
}`,
    },
  },

  java: {
    id: 'java',
    name: 'Java',
    category: 'Language',
    type: 'single',
    canPreview: false,
    extensions: [java(), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `import java.util.List;

public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) {
        List<String> names = List.of("World", "Java", "Live Coding");
        for (String name : names) {
            System.out.println(greet(name));
        }
    }
}`,
    },
  },

  cpp: {
    id: 'cpp',
    name: 'C / C++',
    category: 'Language',
    type: 'single',
    canPreview: false,
    extensions: [cpp(), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `#include <iostream>
#include <string>
#include <vector>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::vector<std::string> names = {"World", "C++", "Live Coding"};
    for (const auto& name : names) {
        std::cout << greet(name) << std::endl;
    }
    return 0;
}`,
    },
  },

  go: {
    id: 'go',
    name: 'Go',
    category: 'Language',
    type: 'single',
    canPreview: false,
    extensions: [StreamLanguage.define(go), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    names := []string{"World", "Go", "Live Coding"}
    for _, name := range names {
        fmt.Println(greet(name))
    }
}`,
    },
  },

  php: {
    id: 'php',
    name: 'PHP',
    category: 'Language',
    type: 'single',
    canPreview: false,
    extensions: [php(), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `<?php

function greet(string $name): string {
    return "Hello, $name!";
}

$names = ["World", "PHP", "Live Coding"];
foreach ($names as $name) {
    echo greet($name) . PHP_EOL;
}`,
    },
  },

  sql: {
    id: 'sql',
    name: 'SQL',
    category: 'Language',
    type: 'single',
    canPreview: false,
    extensions: [sql(), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `CREATE TABLE users (
  id   INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email)
VALUES
  ('Alice', 'alice@example.com'),
  ('Bob',   'bob@example.com');

SELECT id, name, email
FROM users
WHERE created_at >= NOW() - INTERVAL 7 DAY
ORDER BY name ASC;`,
    },
  },

  markdown: {
    id: 'markdown',
    name: 'Markdown',
    category: 'Language',
    type: 'single',
    canPreview: true,
    extensions: [markdown(), wrap],
    defaults: {
      html: '', css: '', js: '',
      code: `# Hello, Markdown!

Write **bold**, *italic*, or \`inline code\`.

## Features
- Live preview
- Syntax highlighting
- Real-time collaboration

## Code Block
\`\`\`js
console.log("Hello, World!");
\`\`\`

> Tip: Edit this and see it render on the right!`,
    },
  },
}

export const MODE_LIST = Object.values(MODES)
export const CATEGORIES: Category[] = ['Web', 'Framework', 'Language']

// ─── React Code Processor ─────────────────────────────────────────────────────
// Handles `export default` dan auto-inject ReactDOM.createRoot jika belum ada.

function processReactCode(code: string): string {
  const alreadyRendered =
    code.includes('ReactDOM.createRoot') || code.includes('ReactDOM.render')

  // Deteksi nama komponen dari berbagai pola export default
  let componentName: string | null = null

  // export default function Name / export default class Name
  const inlineMatch = code.match(/export\s+default\s+(?:function|class)\s+(\w+)/)
  if (inlineMatch) componentName = inlineMatch[1]

  // export default Name  (di akhir file, setelah definisi)
  if (!componentName) {
    const refMatch = code.match(/export\s+default\s+(\w+)\s*;?\s*$/)
    if (refMatch) componentName = refMatch[1]
  }

  // Strip semua export keywords
  let processed = code
    .replace(/export\s+default\s+(?=function|class)/g, '')  // export default function → function
    .replace(/export\s+default\s+\w+\s*;?\s*$/m, '')        // export default Name
    .replace(/export\s+default\s+/g, '')                     // sisa export default
    .replace(/\bexport\s+/g, '')                             // export const/let/...

  // Tambahkan render call jika belum ada dan ketemu nama komponen
  if (!alreadyRendered && componentName) {
    processed += `\n\nReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(${componentName}, null)
);`
  }

  return processed
}

// ─── Vue Code Processor ───────────────────────────────────────────────────────
// Handles `import from 'vue'`, `export default`, dan auto-inject `.mount()`.

function processVueCode(code: string): string {
  let processed = code

  // import { ref, computed, ... } from 'vue'  →  const { ref, computed, ... } = Vue
  processed = processed.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]vue['"]\s*;?/g,
    (_, imports) => `const {${imports}} = Vue;`
  )

  // Hapus import lain yang tidak didukung di non-module context
  processed = processed.replace(/import\s+.*?from\s+['"][^'"]+['"]\s*;?\n?/g, '')

  const alreadyMounted = processed.includes('.mount(')

  if (!alreadyMounted && processed.includes('export default')) {
    // Ganti "export default" dengan variabel sementara, lalu mount
    processed = processed.replace(/export\s+default\s+/, 'const __vueComp = ')
    processed += "\n\nVue.createApp(__vueComp).mount('#app');"
  } else {
    // Sudah ada .mount(), cukup strip export keywords
    processed = processed
      .replace(/export\s+default\s+/g, '')
      .replace(/\bexport\s+/g, '')
  }

  return processed
}

// ─── Preview Builder ──────────────────────────────────────────────────────────

export function buildPreview(mode: ModeConfig, content: ContentState): string {
  switch (mode.id) {
    case 'html-css-js':
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${content.css}</style>
</head>
<body>
  ${content.html}
  <script type="text/javascript">${content.js}<\/script>
</body>
</html>`

    case 'react': {
      const reactCode = processReactCode(content.code)
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">${reactCode}<\/script>
</body>
</html>`
    }

    case 'vue': {
      const vueCode = processVueCode(content.code)
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app"></div>
  <script>${vueCode}<\/script>
</body>
</html>`
    }

    case 'markdown':
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 0 24px; color: #1a1a1a; line-height: 1.6; }
    pre { background: #f4f4f4; padding: 16px; border-radius: 6px; overflow-x: auto; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-size: 0.9em; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 16px; color: #555; }
  </style>
</head>
<body>
  <div id="content"></div>
  <script>
    document.getElementById('content').innerHTML = marked.parse(${JSON.stringify(content.code)});
  <\/script>
</body>
</html>`

    default:
      return ''
  }
}
