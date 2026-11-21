import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShinyButton } from "@/components/ui/shiny-button";
import { site } from "@/lib/content";
import { formatDate, getPost, posts, readingMinutes } from "@/lib/writing";

// Static export: every post is generated at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  const title = `${post.title} · ${site.shortName}`;
  return {
    title,
    description: post.summary,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description: post.summary,
      url: `/writing/${post.slug}`,
      publishedTime: post.date,
      authors: [site.name],
    },
    twitter: { card: "summary_large_image", title, description: post.summary },
  };
}

export default async function PostPage(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <SiteHeader current="writing" />
      <main id="main" tabIndex={-1} className="outline-none">
        <article aria-labelledby="post-title">
          <header id="top" className="wrap pt-[calc(var(--header-h)+3.5rem)] pb-12 md:pt-[calc(var(--header-h)+5rem)] md:pb-16">
            <Link
              href="/#writing"
              className="link flex min-h-11 w-fit items-center gap-2 text-sm text-ink-3"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All writing
            </Link>
            <p className="eyebrow mt-6 flex-wrap gap-y-2">
              <span className="eyebrow-index">Writing</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              {readingMinutes(post)} min read
            </p>
            <h1 id="post-title" className="h-display mt-6 max-w-[14ch]">
              {post.title}
            </h1>
            <p className="lead mt-7">{post.summary}</p>
          </header>

          <div className="border-t border-line">
            <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
              {/* Contents: sticky on wide screens */}
              <nav aria-label="Contents" className="hidden lg:block">
                <div className="sticky top-[calc(var(--header-h)+2rem)]">
                  <p className="eyebrow">Contents</p>
                  <ol className="mt-5 flex flex-col border-l border-line">
                    {post.chapters.map((chapter, i) => (
                      <li key={chapter.id}>
                        <a
                          href={`#${chapter.id}`}
                          className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-ink-3 transition-colors hover:border-signal hover:text-ink"
                        >
                          <span className="font-mono text-[0.7rem] text-signal">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {chapter.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>

              <div className="flex max-w-[68ch] flex-col gap-14 md:gap-16">
                {post.chapters.map((chapter, i) => (
                  <section key={chapter.id} id={chapter.id} aria-labelledby={`${chapter.id}-h`}>
                    <p className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</p>
                    <h2 id={`${chapter.id}-h`} className="h-card mt-3">
                      {chapter.heading}
                    </h2>
                    {chapter.meta ? (
                      <p className="mt-2 font-mono text-[0.72rem] tracking-[0.12em] text-ink-3 uppercase">
                        {chapter.meta}
                      </p>
                    ) : null}
                    <div className="mt-5 flex flex-col gap-5 leading-[1.75]">
                      {chapter.paragraphs.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}

                <aside aria-label="Get in touch" className="card p-6 sm:p-8">
                  <p className="h-card font-heading font-semibold text-ink">Building something with LLMs?</p>
                  <p className="mt-3">
                    Write to me about full-stack AI roles or contract work. Email is the quickest
                    way to reach me.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <ShinyButton href={`mailto:${site.email}`} arrow>
                      Email me
                    </ShinyButton>
                    <ShinyButton href="/#work" variant="secondary">
                      See my work
                    </ShinyButton>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
