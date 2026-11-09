# Component: Shiny Button

A pill-shaped CTA button with an animated conic-gradient border, a dotted pattern, an inner shimmer and a glow on hover. It is mostly CSS (custom `@property` animations) and is idle until hovered or focused.

- **Owner's instruction:** "use this for button". Use it for the site's buttons and CTAs.
- **Target location:** `components/ui/shiny-button.tsx`
- **Export:** named export `ShinyButton` (not default)
- **Styling method:** `<style jsx>` (styled-jsx, built into Next.js)
- **Font used:** Inter 500 (loaded with `@import` from Google Fonts inside the style block)

## Original source (verbatim, as provided)

`shiny-button.tsx`

```tsx
"use client"

import type React from "react"

interface ShinyButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ShinyButton({ children, onClick, className = "" }: ShinyButtonProps) {
  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,500&display=swap");

        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }

        @property --gradient-shine {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }

        .shiny-cta {
          --shiny-cta-bg: #000000;
          --shiny-cta-bg-subtle: #1a1818;
          --shiny-cta-fg: #ffffff;
          --shiny-cta-highlight: blue;
          --shiny-cta-highlight-subtle: #8484ff;
          --animation: gradient-angle linear infinite;
          --duration: 3s;
          --shadow-size: 2px;
          --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);
          
          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;
          padding: 1.25rem 2.5rem;
          font-family: "Inter", sans-serif;
          font-size: 1.125rem;
          line-height: 1.2;
          font-weight: 500;
          border: 1px solid transparent;
          border-radius: 360px;
          color: var(--shiny-cta-fg);
          background: linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg)) padding-box,
            conic-gradient(
              from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
              transparent,
              var(--shiny-cta-highlight) var(--gradient-percent),
              var(--gradient-shine) calc(var(--gradient-percent) * 2),
              var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
              transparent calc(var(--gradient-percent) * 4)
            ) border-box;
          box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          transition: var(--transition);
          transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine;
        }

        .shiny-cta::before,
        .shiny-cta::after,
        .shiny-cta span::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          z-index: -1;
        }

        .shiny-cta:active {
          translate: 0 1px;
        }

        /* Dots pattern */
        .shiny-cta::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
            circle at var(--position) var(--position),
            white calc(var(--position) / 4),
            transparent 0
          ) padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.4;
          z-index: -1;
        }

        /* Inner shimmer */
        .shiny-cta::after {
          --animation: shimmer linear infinite;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(
            -50deg,
            transparent,
            var(--shiny-cta-highlight),
            transparent
          );
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
        }

        .shiny-cta span {
          z-index: 1;
        }

        .shiny-cta span::before {
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
          opacity: 0;
          transition: opacity var(--transition);
          animation: calc(var(--duration) * 1.5) breathe linear infinite;
        }

        /* Animate */
        .shiny-cta,
        .shiny-cta::before,
        .shiny-cta::after {
          animation: var(--animation) var(--duration),
            var(--animation) calc(var(--duration) / 0.4) reverse paused;
          animation-composition: add;
        }

        .shiny-cta:is(:hover, :focus-visible) {
          --gradient-percent: 20%;
          --gradient-angle-offset: 95deg;
          --gradient-shine: var(--shiny-cta-highlight-subtle);
        }

        .shiny-cta:is(:hover, :focus-visible),
        .shiny-cta:is(:hover, :focus-visible)::before,
        .shiny-cta:is(:hover, :focus-visible)::after {
          animation-play-state: running;
        }

        .shiny-cta:is(:hover, :focus-visible) span::before {
          opacity: 1;
        }

        @keyframes gradient-angle {
          to {
            --gradient-angle: 360deg;
          }
        }

        @keyframes shimmer {
          to {
            rotate: 360deg;
          }
        }

        @keyframes breathe {
          from, to {
            scale: 1;
          }
          50% {
            scale: 1.2;
          }
        }
      `}</style>

      <button className={`shiny-cta ${className}`} onClick={onClick}>
        <span>{children}</span>
      </button>
    </>
  )
}
```

`demo.tsx`

```tsx
import { ShinyButton } from "@/components/ui/shiny-button";

export default function DemoOne() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ShinyButton onClick={() => alert("Button clicked!")}>Get unlimited access</ShinyButton>
    </div>
  )
}
```

## Default config

| Variable | Value | Note |
|---|---|---|
| `--shiny-cta-bg` | `#000000` | Button fill |
| `--shiny-cta-bg-subtle` | `#1a1818` | Inner ring |
| `--shiny-cta-fg` | `#ffffff` | Text |
| `--shiny-cta-highlight` | `blue` | **Replace with the site's accent color** |
| `--shiny-cta-highlight-subtle` | `#8484ff` | Hover shine, so derive it from the accent too |
| `--duration` | `3s` | Border spin speed |
| Padding / size | `1.25rem 2.5rem`, `1.125rem` text | Large. Probably needs a smaller size for the nav or cards |

## Fixes and changes needed when integrating (apply at build time)

1. **Move the CSS out of `<style jsx>`** into `app/globals.css` (or a CSS module). Reasons:
   - The `@import url(...)` font inside a scoped styled-jsx block is unreliable, because `@import` must be at the top of a stylesheet.
   - styled-jsx scopes `@keyframes` names, which can break the `var(--animation)` indirection.
   - It ties the button to Next.js's styled-jsx. Plain CSS works everywhere.
2. **Load the font with `next/font`** instead of the Google `@import`. Use the site's chosen typeface rather than Inter if a different one is picked (see [../03-design-direction.md](../03-design-direction.md)).
3. **Accept all native button props.** Extend `React.ButtonHTMLAttributes<HTMLButtonElement>` so `type`, `disabled`, `aria-label` and so on work. Default `type="button"`; without it, the button submits forms.
4. **Support links.** Most portfolio CTAs are links ("View projects", "Download CV", "Email me"). Add an `href` prop that renders an `<a>` (or an `asChild` pattern via Radix `Slot`) with the same styling.
5. **Add size variants**, e.g. `sm` (nav and cards) and `lg` (hero), because the default padding is too big for everything.
6. **Use `cn()`** from `@/lib/utils` for `className` merging (the shadcn convention).
7. **Theme it.** Map `--shiny-cta-highlight` and `--shiny-cta-highlight-subtle` to the site's accent tokens so it matches the Tubes Cursor palette.
8. **`prefers-reduced-motion`.** Disable the spin, shimmer and breathe animations, and keep a static highlighted border.
9. **Disabled state** styling: no animation, reduced opacity, `cursor: not-allowed`.

## Things to watch

- **Browser support:** `@property` and `animation-composition` are needed for the animated border. Older browsers show a static button, which is an acceptable fallback.
- **Focus visibility:** `:focus-visible` triggers the hover effect. Keep `outline-offset: 4px` and make sure an outline is actually visible on the dark background.
- **Not every button should shine.** If every button animates, the effect stops meaning anything. Use the full shiny style for primary CTAs, and possibly a calmer variant (same shape, no shimmer) for secondary actions. Confirm with the owner at build time if needed.
