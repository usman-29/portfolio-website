import { cn } from "@/lib/utils";

/**
 * A company mark on a dark tile, in its own colours. Without a logo file,
 * the company's initials are shown instead, so every row keeps the same shape.
 */
export function CompanyLogo({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-xl border border-line-strong bg-surface",
        size === "md" ? "size-12" : "size-10",
        className,
      )}
    >
      {src ? (
        // Static export: plain <img> (next/image optimisation isn't available)
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${name} logo`}
          className={size === "md" ? "size-7 object-contain" : "size-6 object-contain"}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span aria-hidden="true" className="font-mono text-[0.72rem] font-medium tracking-wider text-ink-2">
          {initials}
        </span>
      )}
    </span>
  );
}
