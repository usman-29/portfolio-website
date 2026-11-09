import { SectionHeading } from "@/components/section-heading";
import { skills } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="section">
      <div className="wrap">
        <SectionHeading
          id="stack-title"
          index="03"
          label="Stack"
          title="The tools I build with"
          intro="Grouped the way a system is put together: the model layer first, then the data, services and infrastructure around it."
        />

        <dl className="border-b border-line">
          {skills.map((group) => (
            <div
              key={group.group}
              className="group grid gap-4 border-t border-line py-6 transition-colors duration-300 hover:bg-bg-raised/60 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-12 md:py-7"
            >
              <dt className="flex items-baseline justify-between gap-4 md:block">
                <span className="font-heading text-lg font-semibold tracking-tight text-ink">
                  {group.group}
                </span>
                <span className="font-mono text-[0.72rem] text-ink-3 md:mt-1 md:block">
                  {String(group.items.length).padStart(2, "0")} tools
                </span>
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="chip transition-colors duration-300 group-hover:border-line-strong group-hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
