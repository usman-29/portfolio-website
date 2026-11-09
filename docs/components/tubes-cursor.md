# Component: Tubes Cursor

A full-screen WebGL animation: glowing 3D tubes that follow the mouse. Clicking anywhere randomises the tube and light colors. Hero text sits on top of the canvas.

- **Target location:** `components/ui/tubes-cursor.tsx` (the original name `tubes-curor.tsx` has a typo; see the notes below)
- **Intended use in portfolio:** hero section background
- **External dependency:** loads `threejs-components@0.0.19` (`build/cursors/tubes1.min.js`) at runtime from the jsDelivr CDN. Nothing to install with npm.
- **Font used:** Montserrat (must be loaded, e.g. via `next/font/google`)

## Original source (verbatim, as provided)

`tubes-curor.tsx`

```tsx
import React, { useEffect, useRef } from 'react';

// The main App component that encapsulates the animation
// In React, component names must start with a capital letter to be recognized as components.
// I've renamed the function from "component" to "TubesCursor".
export default function TubesCursor() {
  // useRef to get a persistent reference to the canvas element
  const canvasRef = useRef(null);
  // useRef to hold the animation instance so we can call its methods
  const appRef = useRef(null);

  /**
   * Generates an array of random hex color strings.
   * @param {number} count - The number of random colors to generate.
   * @returns {string[]} An array of color strings.
   */
  const randomColors = (count) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  // This effect runs once when the component mounts
  useEffect(() => {
    // The error "Computed radius is NaN" suggests a race condition where the animation 
    // library initializes before the canvas element has its final dimensions, leading 
    // to invalid geometry calculations. Delaying the initialization with setTimeout 
    // ensures the DOM is fully painted and ready.
    const initTimer = setTimeout(() => {
      import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
        .then(module => {
          const TubesCursor = module.default;
          
          // Ensure the canvas element is still available before initializing
          if (canvasRef.current) {
            // Initialize the TubesCursor animation
            const app = TubesCursor(canvasRef.current, {
              tubes: {
                colors: ["#5e72e4", "#8965e0", "#f5365c"],
                lights: {
                  intensity: 200,
                  colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"]
                }
              }
            });
            // Store the instance in our ref for later use
            appRef.current = app;
          }
        })
        .catch(err => console.error("Failed to load TubesCursor module:", err));
    }, 100); // 100ms delay to allow for DOM rendering

    // Cleanup function to dispose of the animation and clear the timeout
    return () => {
      clearTimeout(initTimer);
      // Check if app was initialized and has a dispose method before calling
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        appRef.current.dispose();
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once


  // Handles click events on the main container
  const handleClick = () => {
    if (appRef.current) {
      const newTubeColors = randomColors(3);
      const newLightColors = randomColors(4);
      
      // Update the colors in the running animation
      appRef.current.tubes.setColors(newTubeColors);
      appRef.current.tubes.setLightsColors(newLightColors);
    }
  };

  return (
    // Main container with full-screen styles and click handler
    <div
      onClick={handleClick}
      className="h-screen w-screen bg-black font-['Montserrat',_sans-serif] overflow-hidden cursor-pointer"
    >
      {/* Canvas element for the animation, positioned behind everything else */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      
      {/* Hero content displayed over the canvas */}
      <div className="relative h-full flex flex-col items-center justify-center gap-2.5 z-10">
        {/* Using arbitrary values for text-shadow which doesn't have a default Tailwind utility */}
        <h1 className="m-0 p-0 text-white text-[80px] font-bold uppercase leading-none select-none [text-shadow:0_0_20px_rgba(0,0,0,1)]">
          Tubes
        </h1>
        <h2 className="m-0 p-0 text-white text-[60px] font-medium uppercase leading-none select-none [text-shadow:0_0_20px_rgba(0,0,0,1)]">
          Cursor
        </h2>
        <p className="m-0 p-0 text-white text-xl leading-none select-none [text-shadow:0_0_20px_rgba(0,0,0,1)]">
          Click to change colors
        </p>
      </div>
    </div>
  );
}
```

`demo.tsx`

```tsx
import TubesCursor from "@/components/ui/tubes-curor";

export default function DemoOne() {
  return <TubesCursor />;
}
```

## Default config

| Setting | Value |
|---|---|
| Tube colors | `#5e72e4`, `#8965e0`, `#f5365c` |
| Light colors | `#21d4fd`, `#b721ff`, `#f4d03f`, `#11cdef` |
| Light intensity | `200` |
| Init delay | `100ms` (works around a "Computed radius is NaN" error) |
| Click behavior | 3 random tube colors + 4 random light colors |

## Fixes needed when integrating (apply at build time)

The code as pasted will **not compile cleanly** in a strict TypeScript + Next.js project:

1. **Filename typo.** Save it as `tubes-cursor.tsx` and import `@/components/ui/tubes-cursor`, or keep `tubes-curor` everywhere. Pick one and be consistent.
2. **`"use client"` is required** at the top (it uses `useEffect`, `useRef` and `onClick`) when using the Next.js App Router.
3. **TypeScript types missing:**
   - `useRef(null)` → `useRef<HTMLCanvasElement>(null)` for the canvas
   - `appRef` needs a type for the app instance (e.g. a small interface with `tubes.setColors`, `tubes.setLightsColors` and `dispose?`)
   - `randomColors(count)` → `randomColors(count: number): string[]`
4. **Importing from a URL:** TypeScript can't resolve a module at a URL, and the bundler will try to bundle it. Use:
   ```ts
   import(/* webpackIgnore: true */ 'https://cdn.jsdelivr.net/...')
   ```
   (Use `/* @vite-ignore */` for Vite.) Add a `// @ts-expect-error` comment, or declare the module, to silence the type error.
5. **Hardcoded hero text** ("Tubes / Cursor / Click to change colors"). For the portfolio, refactor it to accept `children` (or title/subtitle props) so the hero shows the owner's name and role.
6. **`h-screen w-screen` plus a `fixed` canvas:** the canvas is `fixed`, so it stays behind the whole page while scrolling. Decide whether it should be hero-only (switch to `absolute` inside a `relative` container) or a site-wide background.
7. **Load the Montserrat font**, or change the font class to match the portfolio's typography.

## Things to watch

- **Runtime CDN dependency:** if jsDelivr is unreachable, the animation won't load. The `.catch` only logs the error, so keep a plain black background as the fallback.
- **Performance and mobile:** WebGL is heavy. Consider turning it off or simplifying it on low-power devices and for `prefers-reduced-motion`.
- **Accessibility:** the whole hero is a clickable `div`. Make sure links and buttons placed on top still work and are reachable by keyboard.
