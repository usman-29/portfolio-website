import { MapPin } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { CopyEmail } from "@/components/copy-email";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { site } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section overflow-hidden">
      {/* One warm glow, tied to the hero palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[28rem] w-[60rem] max-w-[140vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(255_122_69/0.16),transparent)]"
      />

      <div className="wrap relative">
        <p className="eyebrow">
          <span className="eyebrow-index">05</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          Contact
        </p>

        <h2 id="contact-title" className="h-display mt-6 max-w-[14ch]">
          Building something with LLMs?
        </h2>

        <p className="lead mt-7">
          Write to me about full-stack AI roles, contract work, or a retrieval pipeline that isn&apos;t
          behaving the way it should.
        </p>

        <div className="mt-10 flex flex-col gap-5 border-y border-line py-8 md:flex-row md:items-center md:justify-between">
          <a
            href={`mailto:${site.email}`}
            className="link w-fit font-heading text-[clamp(1.35rem,4.2vw,2.75rem)] font-semibold tracking-tight break-all"
          >
            {site.email}
          </a>
          <CopyEmail email={site.email} />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <ShinyButton href={`mailto:${site.email}`} size="lg" arrow>
            Email me
          </ShinyButton>
          <ShinyButton
            href={site.links.linkedin}
            variant="secondary"
            size="lg"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon className="size-4" />
            LinkedIn
          </ShinyButton>
          <ShinyButton
            href={site.links.github}
            variant="secondary"
            size="lg"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </ShinyButton>
        </div>

        <p className="mt-10 flex items-center gap-2 text-sm text-ink-3">
          <MapPin className="size-4" aria-hidden="true" />
          {site.location} · PKT (UTC+5)
        </p>
      </div>
    </section>
  );
}
