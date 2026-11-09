import { SectionHeading } from "@/components/section-heading";
import { CompanyLogo } from "@/components/company-logo";
import { experience, internships } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="wrap">
        <SectionHeading
          id="experience-title"
          index="02"
          label="Experience"
          title="Where I've shipped production AI"
        />

        <ol className="border-b border-line">
          {experience.map((role) => (
            <li
              key={role.company}
              className="grid gap-8 border-t border-line py-10 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-12 md:py-14"
            >
              <div className="md:sticky md:top-[calc(var(--header-h)+2rem)] md:self-start">
                <CompanyLogo name={role.company} src={role.logo} />
                <p className="mt-5 font-mono text-[0.75rem] tracking-[0.12em] text-ink-3 uppercase">
                  {role.period}
                </p>
                <h3 className="h-card mt-2">{role.company}</h3>
                <p className="mt-2 text-ink">{role.title}</p>
                {role.location ? <p className="mt-1 text-sm text-ink-3">{role.location}</p> : null}
              </div>

              <div className="min-w-0">
                <ul className="flex flex-col gap-5">
                  {role.highlights.map((h) => (
                    <li key={h.lead} className="max-w-[68ch]">
                      <span className="font-medium text-ink">{h.lead}</span> {h.text}
                    </li>
                  ))}
                </ul>

                <ul aria-label="Stack" className="mt-8 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-6 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-12">
          <h3 className="text-lg font-semibold tracking-tight">Internships</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {internships.map((job) => (
              <li key={job.company} className="card flex items-center gap-4 p-4 sm:p-5">
                <CompanyLogo name={job.company} src={job.logo} size="sm" />
                <div className="min-w-0">
                  <p className="font-medium text-ink">
                    {job.company}
                    <span className="text-ink-3"> · {job.title}</span>
                  </p>
                  <p className="mt-0.5 font-mono text-[0.72rem] tracking-wide text-ink-3 uppercase">
                    {job.period}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
