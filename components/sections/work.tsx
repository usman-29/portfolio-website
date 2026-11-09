import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FlowDiagram } from "@/components/flow-diagram";
import { GitHubIcon } from "@/components/brand-icons";
import { CompanyLogo } from "@/components/company-logo";
import { productWork, projects, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="wrap">
        <SectionHeading
          id="work-title"
          index="01"
          label="Selected work"
          title="Three systems, built end to end"
          intro="A clinical safety platform, an agentic RAG app and a streaming payments service. Each sketch shows how a request moves through the system."
        />

        <ol className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, i) => (
            <li key={project.id}>
              <article
                aria-labelledby={`${project.id}-title`}
                className="card card-hover grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 lg:p-10"
              >
                <div className={cn("flex flex-col", i % 2 === 1 && "lg:order-2")}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-signal">0{i + 1}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                    <span className="font-mono text-[0.72rem] tracking-[0.12em] text-ink-3 uppercase">
                      {project.kind}
                    </span>
                  </div>

                  <h3 id={`${project.id}-title`} className="h-card mt-5">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-[58ch]">{project.summary}</p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {project.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] h-px w-3 shrink-0 bg-signal"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <ul aria-label="Stack" className="mt-7 flex flex-wrap gap-2 lg:mt-auto lg:pt-8">
                    {project.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {project.href ? (
                    <a
                      href={project.href}
                      className="link mt-6 inline-flex w-fit items-center gap-1.5 text-sm"
                    >
                      View project <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>

                <div className={cn(i % 2 === 1 && "lg:order-1")}>
                  <FlowDiagram flow={project.flow} label={project.title} />
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-16 md:mt-20">
          <h3 className="text-lg font-semibold tracking-tight">Product teams I&apos;ve built with</h3>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8">
            {productWork.map((p) => (
              <li key={p.company} className="flex">
                <article
                  aria-labelledby={`pw-${p.company}`}
                  className="card card-hover flex w-full flex-col p-6 sm:p-8"
                >
                  <div className="flex items-center gap-4">
                    <CompanyLogo name={p.company} src={p.logo} />
                    <div>
                      <h4 id={`pw-${p.company}`} className="text-xl font-semibold tracking-tight">
                        {p.company}
                      </h4>
                      <p className="font-mono text-[0.72rem] tracking-[0.12em] text-signal uppercase">
                        {p.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 max-w-[56ch]">{p.about}</p>
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link mt-auto inline-flex min-h-11 w-fit items-center gap-1.5 pt-4 text-sm"
                    >
                      {p.href.replace(/^https?:\/\//, "")}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 flex items-center gap-2.5 text-ink-3">
          <GitHubIcon className="size-4" />
          More code on{" "}
          <a href={site.links.github} className="link" target="_blank" rel="noreferrer">
            github.com/usman-29
          </a>
        </p>
      </div>
    </section>
  );
}
