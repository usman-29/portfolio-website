import { TubesCursor } from "@/components/ui/tubes-cursor";
import { ShinyButton } from "@/components/ui/shiny-button";
import { hero, site } from "@/lib/content";

export function Hero() {
  return (
    <TubesCursor className="min-h-[100svh]">
      {/* Scrims keep the copy readable over the moving light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(10_10_11/0.86)_0%,rgb(10_10_11/0.55)_36%,rgb(10_10_11/0.08)_66%,transparent_100%)] max-md:bg-[linear-gradient(180deg,rgb(10_10_11/0.35)_0%,rgb(10_10_11/0.78)_55%,rgb(10_10_11/0.95)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
      />

      <section
        id="top"
        aria-labelledby="hero-title"
        className="wrap relative z-10 flex min-h-[100svh] flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-10 md:pb-14"
      >
        <div data-enter className="max-w-[46rem]">
          <p className="eyebrow items-start">
            <span aria-hidden="true" className="live-dot mt-[0.45em] size-1.5 shrink-0 rounded-full bg-signal" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="h-display mt-6 [text-shadow:0_2px_30px_rgb(0_0_0/0.55)]"
          >
            Muhammad
            <br />
            Usman Saeed
          </h1>

          <p className="lead mt-7 text-ink-2 [text-shadow:0_1px_16px_rgb(0_0_0/0.7)]">
            {hero.lead}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ShinyButton href="#work" size="lg" arrow>
              See my work
            </ShinyButton>
            <ShinyButton href={`mailto:${site.email}`} variant="secondary" size="lg">
              Email me
            </ShinyButton>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-3 border-t border-line-strong/80 md:mt-20">
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={
                i === 0
                  ? "pt-5 pr-3 md:pr-8"
                  : "border-l border-line-strong/80 pt-5 pr-3 pl-3 md:pr-8 md:pl-8"
              }
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-heading text-[clamp(1.75rem,4.4vw,3rem)] leading-none font-semibold tracking-tight text-ink">
                {stat.value}
              </dd>
              <dd className="mt-2.5 max-w-[22ch] font-mono text-[0.7rem] leading-snug tracking-wide text-ink-3 uppercase md:text-[0.75rem]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </TubesCursor>
  );
}
