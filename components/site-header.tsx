"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ShinyButton } from "@/components/ui/shiny-button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Solid background once the page leaves the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    const onTop = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive("");
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // Mobile menu: lock scroll, close on Escape
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <a
          href="#top"
          className="group flex min-h-11 items-center gap-3 text-ink"
          aria-label={`${site.name}, back to top`}
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full border border-line-strong font-mono text-[0.72rem] font-medium tracking-wider transition-colors duration-300 group-hover:border-signal group-hover:text-signal"
          >
            {site.initials}
          </span>
          <span className="font-heading text-[1.02rem] font-semibold tracking-tight">
            {site.shortName}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-3.5 text-[0.95rem] transition-colors duration-200",
                      isActive ? "text-ink" : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 bottom-2 h-px origin-left bg-signal transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <ShinyButton href={`mailto:${site.email}`} variant="secondary" size="sm">
            Email me
          </ShinyButton>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto bg-bg md:hidden"
      >
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col justify-between pt-6 pb-10">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.id} className="border-b border-line">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-center justify-between font-heading text-3xl font-semibold tracking-tight text-ink"
                >
                  {item.label}
                  <span className="font-mono text-xs font-normal text-ink-3">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <ShinyButton
            href={`mailto:${site.email}`}
            size="lg"
            className="mt-10 w-full"
            onClick={() => setOpen(false)}
          >
            Email me
          </ShinyButton>
        </nav>
      </div>
    </header>
  );
}
