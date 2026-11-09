import { ArrowUp } from "lucide-react";
import { site } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 text-sm text-ink-3 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <li>
            <a href={site.links.github} target="_blank" rel="noreferrer" className="link inline-flex min-h-11 items-center">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="link inline-flex min-h-11 items-center">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={site.links.chess} target="_blank" rel="noreferrer" className="link inline-flex min-h-11 items-center">
              Chess.com
            </a>
          </li>
          <li>
            <a href="#top" className="link inline-flex min-h-11 items-center gap-1.5">
              Back to top <ArrowUp className="size-3.5" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
