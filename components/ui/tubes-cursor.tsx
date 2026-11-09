"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Tubes Cursor: glowing WebGL tubes that follow the pointer.
 *
 * Based on the provided `tubes-curor.tsx` component, with these changes:
 * - hero-scoped: the canvas fills its parent (the library's "parent" sizing), not the whole page
 * - clicks cycle curated palettes that match the site, instead of random colors
 * - clicks on links and buttons inside it do not recolor
 * - a keyboard-accessible "Shift colours" control
 * - a static fallback glow if the module fails or the visitor prefers reduced motion
 * - typed; the CDN module is loaded at runtime, outside the bundler
 */

const TUBES_MODULE_URL =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

export type TubesPalette = {
  name: string;
  tubes: [string, string, string];
  lights: [string, string, string, string];
};

/**
 * Owner's colours: violet, turquoise and golden yellow lead every palette.
 * "Ember" carries the site accent (signal orange) so the hero ties back to the buttons.
 */
export const TUBE_PALETTES: TubesPalette[] = [
  {
    name: "Aurora",
    tubes: ["#8b5cf6", "#2dd4bf", "#fbbf24"],
    lights: ["#a78bfa", "#5eead4", "#fde047", "#ff7a45"],
  },
  {
    name: "Violet",
    tubes: ["#7c3aed", "#a78bfa", "#2dd4bf"],
    lights: ["#8b5cf6", "#c4b5fd", "#fbbf24", "#22d3ee"],
  },
  {
    name: "Turquoise",
    tubes: ["#14b8a6", "#5eead4", "#8b5cf6"],
    lights: ["#2dd4bf", "#99f6e4", "#facc15", "#a78bfa"],
  },
  {
    name: "Gold",
    tubes: ["#f59e0b", "#fde047", "#2dd4bf"],
    lights: ["#fbbf24", "#fff3b0", "#8b5cf6", "#ff7a45"],
  },
  {
    name: "Ember",
    tubes: ["#ff7a45", "#ffb347", "#8b5cf6"],
    lights: ["#ff9a5c", "#ffd08a", "#2dd4bf", "#fbbf24"],
  },
];

type TubesApp = {
  tubes: {
    setColors: (colors: string[]) => void;
    setLightsColors: (colors: string[]) => void;
  };
  dispose?: () => void;
};

type TubesFactory = (
  canvas: HTMLCanvasElement,
  options: { tubes: { colors: string[]; lights: { intensity: number; colors: string[] } } },
) => TubesApp;

const INTERACTIVE = "a, button, input, textarea, select, label, summary, [role='button']";

type TubesCursorProps = {
  children?: React.ReactNode;
  className?: string;
  palettes?: TubesPalette[];
  /** Show the "Shift colours" control. */
  showControl?: boolean;
};

export function TubesCursor({
  children,
  className,
  palettes = TUBE_PALETTES,
  showControl = true,
}: TubesCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<TubesApp | null>(null);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "ready" | "off">("idle");

  useEffect(() => {
    let cancelled = false;

    // Delay init so the canvas has its final size (avoids "Computed radius is NaN").
    const initTimer = window.setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setStatus("off");
        return;
      }
      const url: string = TUBES_MODULE_URL;
      import(/* webpackIgnore: true */ /* turbopackIgnore: true */ url)
        .then((mod: { default: TubesFactory }) => {
          const canvas = canvasRef.current;
          if (cancelled || !canvas) return;
          const first = palettes[0];
          const app = mod.default(canvas, {
            tubes: {
              colors: [...first.tubes],
              lights: { intensity: 200, colors: [...first.lights] },
            },
          });
          appRef.current = app;
          setStatus("ready");
        })
        .catch((err: unknown) => {
          console.error("Failed to load TubesCursor module:", err);
          if (!cancelled) setStatus("off");
        });
    }, 100);

    return () => {
      cancelled = true;
      window.clearTimeout(initTimer);
      appRef.current?.dispose?.();
      appRef.current = null;
    };
  }, [palettes]);

  const indexRef = useRef(0);
  const shiftColours = useCallback(() => {
    const next = (indexRef.current + 1) % palettes.length;
    indexRef.current = next;
    setPaletteIndex(next);
    const app = appRef.current;
    if (app) {
      app.tubes.setColors([...palettes[next].tubes]);
      app.tubes.setLightsColors([...palettes[next].lights]);
    }
  }, [palettes]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(INTERACTIVE)) return;
    if (window.getSelection()?.toString()) return;
    shiftColours();
  };

  const current = palettes[paletteIndex];

  return (
    <div
      onClick={handleClick}
      className={cn("relative isolate overflow-hidden bg-bg", className)}
      data-tubes={status}
    >
      {/* Fallback glow: shows before the module loads, or instead of it */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-20 transition-opacity duration-1000",
          status === "ready" ? "opacity-0" : "opacity-100",
        )}
        style={{
          background: `radial-gradient(60% 55% at 78% 38%, ${current.tubes[0]}38, transparent 70%),
             radial-gradient(40% 40% at 62% 72%, ${current.lights[2]}22, transparent 70%),
             radial-gradient(35% 35% at 92% 80%, ${current.tubes[1]}26, transparent 70%)`,
        }}
      />

      {/* The library sizes the canvas to this wrapper ("parent" sizing) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>

      {children}

      {showControl && status !== "off" ? (
        <button
          type="button"
          onClick={shiftColours}
          className="group absolute top-[calc(var(--header-h)+1.25rem)] right-[max(var(--gutter),calc((100%_-_var(--maxw))/2))] z-20 hidden min-h-11 items-center gap-2.5 rounded-full border border-line-strong bg-bg/60 px-3.5 py-2 font-mono text-[0.72rem] tracking-[0.12em] text-ink-2 uppercase backdrop-blur-md transition-colors duration-300 hover:border-signal hover:text-ink md:inline-flex"
          aria-label={`Shift colours. Current palette: ${current.name}`}
        >
          <span className="flex -space-x-1" aria-hidden="true">
            {current.tubes.map((c) => (
              <span
                key={c}
                className="size-3 rounded-full border border-bg transition-colors duration-500"
                style={{ backgroundColor: c }}
              />
            ))}
          </span>
          Shift colours
        </button>
      ) : null}
    </div>
  );
}

export default TubesCursor;
