import type { FlowDiagram as Flow } from "@/lib/content";
import { cn } from "@/lib/utils";

/*
 * A small architecture sketch: input → core → three parallel lanes → output.
 * Pulses run along the wires (paused under reduced motion).
 */

function Node({
  children,
  tone = "base",
  className,
}: {
  children: React.ReactNode;
  tone?: "base" | "core" | "out";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 rounded-lg border px-3 py-2.5 text-center font-mono text-[0.7rem] leading-snug sm:text-[0.78rem]",
        tone === "base" && "border-line-strong bg-bg-raised text-ink-2",
        tone === "core" && "border-signal/60 bg-[rgb(255_122_69/0.1)] text-ink",
        tone === "out" && "border-line-strong bg-surface text-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}

const STROKE = "var(--line-strong)";
const PULSE = "var(--accent)";

function Straight({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="mx-auto block h-7 w-4"
      viewBox="0 0 16 28"
      preserveAspectRatio="none"
    >
      <path d="M8 0V28" stroke={STROKE} strokeWidth="1.25" fill="none" />
      <path
        d="M8 0V28"
        stroke={PULSE}
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        className="wire-pulse"
        style={{ animationDelay: `${delay}s` }}
      />
    </svg>
  );
}

const SPLIT = ["M150 0 C150 20 50 16 50 36", "M150 0 V36", "M150 0 C150 20 250 16 250 36"];
const MERGE = ["M50 0 C50 20 150 16 150 36", "M150 0 V36", "M250 0 C250 20 150 16 150 36"];

function Branch({ paths, delay = 0 }: { paths: string[]; delay?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="block h-9 w-full"
      viewBox="0 0 300 36"
      preserveAspectRatio="none"
    >
      {paths.map((d) => (
        <path
          key={`base-${d}`}
          d={d}
          stroke={STROKE}
          strokeWidth="1.25"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {paths.map((d, i) => (
        <path
          key={`pulse-${d}`}
          d={d}
          stroke={PULSE}
          strokeWidth="1.75"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="wire-pulse"
          style={{ animationDelay: `${delay + i * 0.35}s` }}
        />
      ))}
    </svg>
  );
}

export function FlowDiagram({ flow, label }: { flow: Flow; label: string }) {
  return (
    <div
      role="group"
      aria-label={`${label}: how a request moves through the system`}
      className="dot-ground flex h-full flex-col justify-center rounded-xl border border-line p-4 sm:p-7"
    >
      <Node className="mx-auto w-full max-w-[16rem]">{flow.input}</Node>
      <Straight />
      <Node tone="core" className="mx-auto w-full max-w-[18rem]">
        {flow.core}
      </Node>
      <Branch paths={SPLIT} delay={0.6} />
      <ul className="grid grid-cols-3 gap-2 sm:gap-3">
        {flow.lanes.map((lane) => (
          <li key={lane} className="flex">
            <Node className="flex w-full items-center justify-center">{lane}</Node>
          </li>
        ))}
      </ul>
      <Branch paths={MERGE} delay={1.4} />
      <Node tone="out" className="mx-auto w-full max-w-[18rem]">
        {flow.output}
      </Node>
    </div>
  );
}
