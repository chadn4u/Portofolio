# Portfolio Next.js — Design Spec
**Date:** 2026-05-19  
**Status:** Approved  
**Reference:** `Portfolio.html`

---

## Overview

Build a personal portfolio website using Next.js App Router, TypeScript, and custom CSS (matching the reference HTML exactly). Projects are data-driven via a local JSON file. Contact form uses Web3Forms. Deploy target: Vercel.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Custom CSS in `globals.css` (ported from reference) |
| Fonts | JetBrains Mono + Space Grotesk (Google Fonts) |
| Icons | Remixicon (CDN) |
| Contact | Web3Forms (free tier) |
| Data | Local `data/projects.json` |
| Deploy | Vercel |

---

## File Structure

```
app/
├── layout.tsx              # Root layout: metadata, fonts, globals.css
├── page.tsx                # Server Component — assembles all sections
├── globals.css             # All CSS variables, keyframes, component styles
components/
├── layout/
│   └── Navbar.tsx          # Client — hamburger toggle, scroll-active nav, progress bar
├── sections/
│   ├── Hero.tsx            # Client — typing animation, clock, HUD fluctuation, stats counter
│   ├── About.tsx           # Client — skill bars via IntersectionObserver
│   ├── Projects.tsx        # Client — grid/list toggle, project modal
│   └── Contact.tsx         # Client — Web3Forms submission
├── ui/
│   └── AnimatedBackground.tsx  # dynamic({ ssr: false }) — canvas network, cursor spotlight, bg-grid mouse follow
data/
└── projects.json           # All project data (JSON array)
lib/
└── types.ts                # TypeScript interfaces
public/
└── (static assets, CV PDF when ready)
```

---

## Data Model

```typescript
// lib/types.ts

export interface Project {
  id: string                          // "P-001"
  slug: string                        // "conversational-ai"
  title: string
  tagline: string
  stack: string[]
  status: 'shipping' | 'live' | 'archived'
  users: string                       // "42k"
  uptime: string                      // "99.9"
  visual: 'chat' | 'chart' | 'flow' | 'vision' | 'reco' | 'voice'
  role: string
  year: string
  duration: string
  client: string
  problem: string
  challenges: string[]
  outcomes: Outcome[]
  arch: ArchLayer[]
}

export interface Outcome {
  v: string       // "-67%"
  l: string       // "Avg Response Time"
  s: string       // "vs human-only baseline"
  green: boolean
}

export interface ArchLayer {
  lbl: string
  nodes: ArchNode[]
}

export interface ArchNode {
  n: string
  hi?: 'hi' | 'lime'
}
```

`data/projects.json` is a plain JSON array of `Project` objects. Adding or editing projects requires no component changes.

---

## Component Responsibilities

### `app/layout.tsx` (Server)
- Google Fonts link tags (JetBrains Mono, Space Grotesk)
- Remixicon CDN link
- `export const metadata` for SEO / OpenGraph
- Imports `globals.css`

### `app/page.tsx` (Server Component)
- Imports `projects` from `@/data/projects.json`
- Renders: `<AnimatedBackground />`, `<Navbar />`, `<main>` with all sections, `<Footer />`
- Passes `projects` prop to `<Projects>`

### `AnimatedBackground` (Client — `dynamic({ ssr: false })`)
- Network canvas with animated dots + connecting lines (`requestAnimationFrame`)
- Cursor spotlight radial glow (`spot` div)
- `bg-grid` CSS variable update on `mousemove`
- Scanlines + bg-fx overlays (pure CSS rendered server-side; JS only for mouse tracking)

### `Navbar` (Client)
- Fixed top bar with brand, nav links, CTA button
- Hamburger toggle for mobile (`< 720px`)
- Scroll listener: progress bar width + active nav link highlight

### `Hero` (Client)
- Typing animation cycling through role strings
- Live clock (`setInterval` 1s)
- HUD number fluctuation (`setInterval` 1.8s)
- Stats counter animation (IntersectionObserver)
- Glitch effect on name — pure CSS only

### `About` (Client)
- Static about text + tags
- Skill matrix: IntersectionObserver triggers CSS width transition on `.track i`

### `Projects` (Client)
- Receives `projects: Project[]` prop from server
- Grid view / terminal list view toggle
- Project card click → opens case study modal
- Modal: problem, challenges, outcomes, architecture diagram, stack, CTA buttons
- Keyboard: `Escape` closes modal; click outside modal closes modal

### `Contact` (Client)
- Form fields: name, email, subject, message
- Submit: `fetch` POST to Web3Forms API
- `NEXT_PUBLIC_WEB3FORMS_KEY` env var
- UI feedback: "transmitting..." → "✓ message delivered" (matches reference style)
- Contact info panel: email, location, availability, response time, social links

### `Footer` (Server)
- Static HTML: copyright, uptime display, last deploy label

---

## Animation Strategy

| Animation | Location | Method |
|---|---|---|
| Network canvas | `AnimatedBackground` | `dynamic({ ssr: false })` + `requestAnimationFrame` |
| Cursor spotlight + bg-grid mouse | `AnimatedBackground` | `mousemove` listener in `useEffect` |
| Glitch effect (name) | `Hero` CSS | Pure CSS `@keyframes gl1/gl2` |
| Typing role text | `Hero` | `useEffect` + state machine |
| Live clock | `Hero` | `useEffect` `setInterval` 1s |
| HUD number fluctuation | `Hero` | `useEffect` `setInterval` 1.8s |
| Stats counter | `Hero` | `useEffect` IntersectionObserver |
| Skill bars fill | `About` | `useEffect` IntersectionObserver → CSS `width` transition |
| Scroll reveal sections | Each section | `useEffect` IntersectionObserver → add `.in` class |
| Progress bar | `Navbar` | `useEffect` scroll listener |
| Pulse dot, blink, pulse-graph | `globals.css` | Pure CSS `@keyframes` |
| Panel shimmer line | `globals.css` | Pure CSS gradient `::before` |

**Rule:** All `window` / `document` / `canvas` access only inside `useEffect` or inside `AnimatedBackground` (which is `ssr: false`). This prevents hydration errors on Vercel.

---

## Contact Form — Web3Forms

```typescript
const res = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
    name, email, subject, message
  })
})
```

- Key stored in `.env.local` for local dev
- Added as environment variable in Vercel dashboard for prod
- `.env.local` is gitignored (Next.js default)
- `.env.example` committed with placeholder value

---

## Deployment

- `next.config.ts` — minimal config, no special settings needed
- No `vercel.json` required (Next.js auto-detected by Vercel)
- Build command: `next build` (Vercel default)
- Environment variable on Vercel: `NEXT_PUBLIC_WEB3FORMS_KEY`

---

## SEO / Metadata

```typescript
export const metadata: Metadata = {
  title: 'Richard Mario // Full-Stack Engineer',
  description: 'Full-stack engineer specializing in AI systems, real-time apps, and workflow automation.',
  openGraph: {
    title: 'Richard Mario // Full-Stack Engineer',
    description: 'Full-stack engineer specializing in AI systems, real-time apps, and workflow automation.',
    type: 'website',
  }
}
```

---

## Out of Scope

- Database / CMS
- Authentication
- Blog
- i18n
- Dark/light mode toggle (dark-only by design)
- CV PDF generation (link points to `public/cv.pdf` — user provides file separately)
