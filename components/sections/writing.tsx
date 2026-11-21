import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { formatDate, posts, readingMinutes } from "@/lib/writing";

export function Writing() {
  return (
    <section id="writing" aria-labelledby="writing-title" className="section">
      <div className="wrap">
        <SectionHeading
          id="writing-title"
          index="05"
          label="Writing"
          title="Notes from the work"
          intro="Longer pieces on how I learned what I know and what each job taught me."
        />

        <ol className="flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <article
                aria-labelledby={`post-${post.slug}`}
                className="card card-hover group relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12 lg:p-10"
              >
                <div className="flex flex-col">
                  <p className="font-mono text-[0.72rem] tracking-[0.12em] text-ink-3 uppercase">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true"> · </span>
                    {readingMinutes(post)} min read
                  </p>
                  <h3 id={`post-${post.slug}`} className="h-card mt-4">
                    <a
                      href={`/writing/${post.slug}`}
                      className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none"
                    >
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-4 max-w-[52ch]">{post.summary}</p>
                  <p className="mt-6 inline-flex items-center gap-1.5 font-medium text-ink transition-colors group-hover:text-signal-soft lg:mt-auto lg:pt-8">
                    Read the post
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </p>
                </div>

                {/* Chapter list: a preview of the arc of the post */}
                <ol aria-label="Chapters" className="flex flex-col border-l border-line-strong">
                  {post.chapters.map((chapter, i) => (
                    <li key={chapter.id} className="relative py-1.5 pl-5 text-sm">
                      <span
                        aria-hidden="true"
                        className="absolute top-4 -left-[3px] size-[5px] -translate-y-1/2 rounded-full bg-line-strong transition-colors duration-300 group-hover:bg-signal"
                        style={{ transitionDelay: `${i * 40}ms` }}
                      />
                      <span className="text-ink-2">{chapter.heading}</span>
                      {chapter.meta ? (
                        <span className="mt-0.5 block font-mono text-[0.68rem] tracking-wide text-ink-3 uppercase">
                          {chapter.meta}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
