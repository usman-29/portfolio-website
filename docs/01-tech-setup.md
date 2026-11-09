# Tech Setup

## Current state (2026-11-09)

The project folder `portfolio-website-web` is **empty**. There is no shadcn structure, no Tailwind and no TypeScript yet, so these must be set up first when the build starts.

## Required stack

- **Framework:** Next.js (App Router) with React. This is the most common base for shadcn, and the `@/` import alias in the components works out of the box.
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Component system:** shadcn/ui (CLI-managed `components/ui` folder, `lib/utils.ts`, `components.json`)

## Setup commands (run at build time, not now)

```bash
# 1. Create Next.js app with TypeScript + Tailwind + App Router + "@/*" alias
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"

# 2. Initialise shadcn (creates components.json, lib/utils.ts, CSS variables)
npx shadcn@latest init

# 3. Add shadcn components as needed, e.g.
npx shadcn@latest add button
```

If Next.js is ever swapped for Vite, the steps are: `npm create vite@latest` (React + TS template), install Tailwind, add the `@/*` path alias in `tsconfig.json` + `vite.config.ts`, then `npx shadcn@latest init`.

## Default paths

| Thing | Path | Import alias |
|---|---|---|
| UI components | `components/ui/` | `@/components/ui/...` |
| Other components (sections like Hero, Projects) | `components/` | `@/components/...` |
| Utils (`cn()` helper) | `lib/utils.ts` | `@/lib/utils` |
| Global styles (Tailwind + theme variables) | `app/globals.css` | — |

## Why `/components/ui` matters

- The **shadcn CLI installs every component into `components/ui`** (it's set in `components.json`). Keeping custom primitives there means everything is in one place and the CLI won't clash with it.
- The demo code imports `@/components/ui/tubes-curor`. If the folder doesn't exist at that path, **the import breaks**.
- It keeps reusable, low-level building blocks (`ui/`) apart from page-specific sections (`components/hero.tsx`, etc.), which keeps the codebase easy to maintain.
