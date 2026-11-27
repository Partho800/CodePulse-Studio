# CodePulse Studio

A real-time, bilingual (**বাংলা / English**) interactive learning studio for **HTML**, **CSS**, and **JavaScript** built with **Next.js 16**, **Tailwind CSS v4**, and **CodeMirror 6**.

## Features

- **Tabbed Single-Item Reference Guide (Left Panel):**
  - **HTML (45 items)**, **CSS (18 items)**, and **JavaScript (35 items)**—every tag, CSS property, JS keyword/method, and symbol (`.`, `[ ]`, `?.`, `( )`, `{ }`, `document.getElementById()`) on its own dedicated card.
  - 8-part line-by-line breakdown: Syntax + Copy, Plain Explanation, Symbol & Punctuation Anatomy, Where & Why to Use, If Used vs If Not Used, Key Parts, Beginner -> Intermediate -> Advanced path, and Real-World Uses.
  - Built-in per-tab progress tracker (`learned` toggle saved in `localStorage`) and quick Next (`→`) navigation.
- **Auto-Save Real-Time Practice Console (Center Panel):**
  - Syntax-highlighted **HTML / CSS / JavaScript** tabs plus **All 3** stacked mode, word wrap, font-size controls, and instant `localStorage` auto-save.
- **Live Preview & Console (Right Panel):**
  - Isolated `<iframe sandbox="allow-scripts">` live preview + Console output (`log`, `info`, `warn`, `error`, `table`), syntax/runtime error banner with line numbers, and safe in-memory `localStorage` sandbox fallback.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Import `https://github.com/Partho800/CodePulse-Studio` in [Vercel](https://vercel.com/new).
2. Keep the default **Next.js** framework preset (`npm run build`).
3. Click **Deploy**—no environment variables or database required.
