import type React from "react";
import { cn } from "@/lib/utils";
import "./shiny-button.css";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: React.ReactNode;
  /** "primary" is the shiny CTA; "secondary" is the same pill, without the shimmer. */
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Shows a trailing arrow that nudges on hover. */
  arrow?: boolean;
};

type AsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type AsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ShinyButtonProps = AsButton | AsLink;

function Arrow() {
  return (
    <svg
      className="cta-arrow"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h9.5M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The site's one button. Renders an <a> when `href` is set, otherwise a <button>.
 */
export function ShinyButton(props: ShinyButtonProps) {
  const { children, variant = "primary", size = "md", className, arrow = false, ...rest } = props;

  const classes = cn(variant === "primary" ? "shiny-cta" : "quiet-cta", `cta-${size}`, className);

  const content = (
    <span>
      {children}
      {arrow ? <Arrow /> : null}
    </span>
  );

  if (typeof rest.href === "string") {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} className={classes}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
