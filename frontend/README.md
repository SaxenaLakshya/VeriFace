# VeriFace — Next.js

AI image detection landing page, converted from Vite + React to **Next.js 14** (App Router).

## Stack

- **Next.js 14** — App Router, Server Components
- **TypeScript**
- **Tailwind CSS** — with custom design tokens
- **next/font** — Orbitron, Space Mono, Syne (no layout shift)
- **No extra UI library** — all components built from scratch with CVA

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx        # Root layout with fonts & metadata
  page.tsx          # Entry point → renders <HomePage />
  globals.css       # CSS variables, animations, utility classes
  not-found.tsx     # 404 page

components/
  HomePage.tsx      # Client shell (manages auth state)
  Navbar.tsx
  Hero.tsx
  Marquee.tsx
  DemoSection.tsx   # Full drag-drop scan demo
  Features.tsx
  HowItWorks.tsx
  Testimonials.tsx
  CTAStrip.tsx
  Footer.tsx
  AuthModal.tsx     # Sign in / Sign up modal
  ui/
    button.tsx      # CVA button with all variants

lib/
  utils.ts          # cn() helper
```

## Build

```bash
npm run build
npm start
```

## Key Differences from Vite Version

| Vite (original) | Next.js |
|---|---|
| `react-router-dom` | Next.js App Router |
| `@import` Google Fonts in CSS | `next/font/google` (zero layout shift) |
| `vite.config.ts` | `next.config.js` |
| `index.html` entry | `app/layout.tsx` |
| `src/pages/Index.tsx` | `app/page.tsx` → `components/HomePage.tsx` |
| `src/pages/NotFound.tsx` | `app/not-found.tsx` |
