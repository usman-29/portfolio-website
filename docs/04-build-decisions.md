# Build Decisions (2026-11-09)

What was decided during the build, and why. The open questions in [02-owner-info.md](02-owner-info.md) were not answered before the build, so defaults were chosen. Each default can be changed.

## Hosting

- **Static export** (`output: "export"` in `next.config.ts`). `npm run build` → `out/`. It deploys free on Vercel, Netlify, Cloudflare Pages or GitHub Pages. No server code and no API keys.
- Next.js 16's `cacheComponents` / `partialPrefetching` defaults were removed. A one-page static site doesn't need them.

## One design system

| Piece | Choice | Why |
|---|---|---|
| Ground | `#0a0a0b` graphite, `#111113` raised, `#161618` surface | Dark only, per brief |
| Ink | `#f3f0ea` headings, `#bdb9b2` body (~10:1), `#8d8a84` labels (~5.6:1) | Readable, WCAG AA+ |
| Accent | Signal orange `#ff7a45` (soft `#ffb48c`) | Not the usual AI-portfolio violet/blue. Used for indices, pulses, CTAs and the tubes |
| Display font | Bricolage Grotesque | Characterful but professional; not Inter/Montserrat |
| Body font | IBM Plex Sans | Built for long reading |
| Label font | IBM Plex Mono | Engineering feel for labels, tags, diagrams |
| Buttons | Shiny Button only: `primary` (shimmer) + `secondary` (same pill, no shimmer) | One button family. The shimmer is saved for the main actions |
| Cards | One `.card` style, 2px lift on hover | Consistent |
| Section pattern | `0N / Label`, then the h2 | Same rhythm everywhere; numbers match the mobile menu |

All tokens are in `app/globals.css`. The Tubes Cursor palettes and the Shiny Button read from the same accent.

## Components

- **Tubes Cursor** (`components/ui/tubes-cursor.tsx`): **hero only** (default chosen, because a full-page WebGL background behind text hurts readability and battery). Clicks cycle 4 on-brand palettes (Ember, Tide, Brass, Signal) instead of random colors. A "Shift colours" button does the same from the keyboard. Clicks on links and buttons don't recolor. The module is loaded from the CDN at runtime (bundler-ignored). Under `prefers-reduced-motion` it doesn't load and a static glow is shown. The library pauses itself when off-screen.
- **Shiny Button** (`components/ui/shiny-button.tsx` + `.css`): the original CSS, moved from styled-jsx into a plain CSS file. It renders `<a>` when given `href`, otherwise `<button type="button">`. Sizes sm/md/lg, an optional arrow, a disabled state and reduced motion are supported.

## Content defaults (change in `lib/content.ts`)

- **Availability:** not stated on the site (unknown). The CTAs are "See my work" and "Email me".
- **Photo:** none (not provided). The site uses a "US" monogram.
- **Project links:** none per project (not provided). A single "More code on GitHub" link instead. Add `href` per project when ready.
- **CV download:** not added. If added later, use a copy **without the phone number**.
- **Phone number:** absent everywhere, including the JSON-LD and the share image.

## Chess.com (added on request)

- User `usman10`. Public API, no key, CORS open.
- Fetched at build (baked into the HTML), then refreshed in the browser. If both fail, the snapshot in `lib/chess.ts` is shown.
- Shown: rapid rating, peak rapid, peak puzzles, total games, rapid W/D/L bar, link to the profile.

## Revision 2 (2026-11-09)

- **Tube colours:** at the owner's request, violet, turquoise and golden yellow lead every palette (Aurora, Violet, Turquoise, Gold, Ember). The site accent stays signal orange; Ember carries it into the hero. This is an owner override of the design skill's "no violet" rule, and applies to the tubes only.
- **Hero bio:** now says end-to-end full-stack AI products, not only the AI layer. The About paragraph was changed to match.
- **Logos:** `public/logos/` holds Devsinc (favicon mark), Jazz (favicon mark) and Supy (white mark), taken from each company's own site. Hull Technologies, BrightBee and Chi Tech show lettered tiles until logo files are supplied. Logos sit on dark tiles (`components/company-logo.tsx`).
- **New blocks:** "Product teams I've built with" (BrightBee, Supy) under the projects; "Internships" (Chi Tech, Jazz) under Experience.
- **Chess percentile:** `chess.rapidPercentile` in `lib/content.ts`. It renders "Top X% of rapid players" once set. It's not set, because the public API doesn't expose it and "top 3%" couldn't be verified.

## Checks run

- `tsc`, `eslint`: clean. `next build`: passes. 4 static routes.
- The design skill's copy checker: 0 FAIL. 2 WARN were kept on purpose: two stat strips (real CV and chess figures) and the numbered section labels (a navigation aid).
- Screenshots were reviewed at 1440px and 390px.
