import { Award, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ChessCard } from "@/components/chess-card";
import { about, certifications, chess, education } from "@/lib/content";
import { getChessAtBuild } from "@/lib/chess";

export async function Background() {
  const chessStats = await getChessAtBuild(chess.username);

  return (
    <section id="background" aria-labelledby="background-title" className="section">
      <div className="wrap">
        <SectionHeading
          id="background-title"
          index="04"
          label="Background"
          title="How I got here"
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* About */}
          <div className="flex flex-col gap-5 lg:pr-6">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "lead text-ink" : "lead"}>
                {p}
              </p>
            ))}
          </div>

          {/* Education */}
          <article aria-labelledby="edu-title" className="card card-hover p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.72rem] tracking-[0.12em] text-ink-3 uppercase">
                  {education.period}
                </p>
                <h3 id="edu-title" className="h-card mt-3">
                  {education.degree}
                </h3>
                <p className="mt-1.5 text-ink">{education.school}</p>
              </div>
              <GraduationCap className="size-6 shrink-0 text-signal" aria-hidden="true" />
            </div>

            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <span className="text-ink">{education.grade}</span>
              <span className="text-ink-3">{education.honor}</span>
            </p>

            <ul aria-label="Relevant coursework" className="mt-6 flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
          </article>

          {/* Certifications */}
          <article aria-labelledby="cert-title" className="card card-hover p-6 sm:p-8">
            <h3 id="cert-title" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <Award className="size-5 text-signal" aria-hidden="true" />
              Certifications
            </h3>
            <ul className="mt-5">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="grid gap-1 border-t border-line py-4 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:gap-x-6"
                >
                  <p className="font-medium text-ink">{cert.name}</p>
                  <p className="font-mono text-[0.72rem] tracking-wide text-ink-3 uppercase sm:row-span-2 sm:pt-1 sm:text-right">
                    {cert.issuer} · {cert.date}
                  </p>
                  <p className="text-sm text-ink-3">{cert.detail}</p>
                </li>
              ))}
            </ul>
          </article>

          {/* Chess */}
          <ChessCard
            initial={chessStats}
            username={chess.username}
            profileUrl={chess.profileUrl}
            rapidPercentile={chess.rapidPercentile}
          />
        </div>
      </div>
    </section>
  );
}
