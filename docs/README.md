# Portfolio Website — Project Docs

Everything collected before the build, plus the decisions made while building. **Status: v1 built 2026-11-09.** See [04-build-decisions.md](04-build-decisions.md).

## Index

| File | What it holds |
|---|---|
| [01-tech-setup.md](01-tech-setup.md) | Required stack (shadcn + Tailwind + TypeScript), folder structure, setup commands |
| [components/tubes-cursor.md](components/tubes-cursor.md) | Tubes Cursor component: original source (verbatim), demo, integration notes, fixes needed |
| [02-owner-info.md](02-owner-info.md) | Owner's personal/portfolio info from the CV (no phone number) |
| [03-design-direction.md](03-design-direction.md) | Design brief: dark only, no AI slop, professional, interactive, readable; planned sections |
| [04-build-decisions.md](04-build-decisions.md) | Hosting, design system, component changes, content defaults, chess.com, checks run |
| [components/shiny-button.md](components/shiny-button.md) | Shiny Button component: original source (verbatim), demo, integration notes, fixes needed |

## Decisions so far

1. The site must support the **shadcn project structure, Tailwind CSS and TypeScript**.
2. Reusable UI components live in **`/components/ui`**.
3. The **Tubes Cursor** (WebGL animated tubes that follow the cursor, click to change colors) is to be used in the portfolio, most likely as the hero section background.
4. Content comes from the owner's CV (Muhammad Usman Saeed, Full Stack AI Engineer). See [02-owner-info.md](02-owner-info.md).
5. **🔒 The phone number must NEVER appear on the website** (owner's explicit instruction). Contact is via email, LinkedIn and GitHub only.
6. **Dark theme only**, not common, no AI slop, professional, interactive, easy to read and navigate. See [03-design-direction.md](03-design-direction.md).
7. **Shiny Button** is used for the site's buttons/CTAs.

## Project skills (installed 2026-11-09)

Copied into `.claude/skills/` (from `~/.agents/skills`) so the project carries its own frontend/UI tooling:

| Skill | Use it for |
|---|---|
| `frontend-design` | Visual direction and distinctive, non-template typography and layout |
| `frontend-design-pro` | Hero/background imagery: real photo links or image-generation prompts |
| `design-taste-frontend` | Anti-"AI-slop" site building with a checker/finish gate in a real browser |
| `ui-ux-pro-max` | UX rules, palettes, font pairings, GSAP presets, Next.js/React stack guidance |
| `ui-styling` | shadcn/ui + Tailwind components, theming, dark mode |
| `design-system` | Design tokens (primitive → semantic → component), spacing/type scales |
| `web-design-guidelines` | Final accessibility/UX review of the built UI |

Not copied (not relevant to the site): `banner-design`, `brand`, `design`, `slides`. These remain available globally.

## Still waiting on

- The open questions listed at the bottom of [02-owner-info.md](02-owner-info.md) (photo, project links, availability, design preferences)
- Any more components / design references
- The "start building" go-ahead
