# Muhammad Usman Saeed: Portfolio

Personal portfolio. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui, exported as a **static site** so it can be hosted free anywhere.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npx serve out      # preview the production build
```

## Edit the content

All text lives in [`lib/content.ts`](lib/content.ts): hero, projects, experience, skills, education, certifications, links. Components only render it.

- Add a repo or demo link to a project: set `href` on that project.
- **Never add the phone number.** It is deliberately left off the site.

Chess stats (chess.com user `usman10`) are fetched at build time and refreshed live in the visitor's browser. If chess.com is unreachable, the snapshot in [`lib/chess.ts`](lib/chess.ts) is shown.

## Deploy (free)

### Vercel (recommended)
1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Keep the defaults (Framework: Next.js) and click **Deploy**.

The production URL is picked up automatically for share previews. To use a custom domain, add it in Vercel and set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` under Project → Settings → Environment Variables.

### Any other static host (Netlify, Cloudflare Pages, GitHub Pages)
- Build command: `npm run build`
- Output directory: `out`
- Set `NEXT_PUBLIC_SITE_URL` to the site's URL so share previews resolve.

## Structure

```
app/                 layout (fonts, metadata), page, share image, icon, 404
components/ui/       shiny-button (+ .css), tubes-cursor: the two provided components, adapted
components/sections/ hero, work, experience, stack, background, contact
components/          header, footer, flow diagram, chess card, shared heading
lib/content.ts       all site copy
lib/chess.ts         chess.com fetch + fallback snapshot
docs/                project brief, owner info, design direction, component notes
```
