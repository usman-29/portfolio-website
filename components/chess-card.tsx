"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ChessKnight } from "lucide-react";
import { fetchChess, type ChessSummary } from "@/lib/chess";

const fmt = new Intl.NumberFormat("en-US");

/**
 * chess.com stats. Renders the build-time numbers, then refreshes them live
 * from the public API in the browser. Falls back silently if that fails.
 */
export function ChessCard({
  initial,
  username,
  profileUrl,
  rapidPercentile,
}: {
  initial: ChessSummary;
  username: string;
  profileUrl: string;
  /** From chess.com's stats page (the public API doesn't expose it). */
  rapidPercentile?: number | null;
}) {
  const [data, setData] = useState(initial);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchChess(username, controller.signal)
      .then((fresh) => {
        setData(fresh);
        setLive(true);
      })
      .catch(() => {
        /* keep the build-time numbers */
      });
    return () => controller.abort();
  }, [username]);

  const record = data.rapidRecord;
  const total = record ? record.win + record.loss + record.draw : 0;
  const pct = (n: number) => (total ? (n / total) * 100 : 0);

  return (
    <article aria-labelledby="chess-title" className="card card-hover flex flex-col p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h3 id="chess-title" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <ChessKnight className="size-5 text-signal" aria-hidden="true" />
          Chess
        </h3>
        <span className="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.12em] text-ink-3 uppercase">
          <span
            aria-hidden="true"
            className={live ? "live-dot size-1.5 rounded-full bg-[#5fd068]" : "size-1.5 rounded-full bg-ink-3"}
          />
          {live ? "Live from chess.com" : `As of ${data.asOf}`}
        </span>
      </div>

      <p className="mt-4 text-ink-2">
        Away from the keyboard I play rapid on chess.com
        {data.memberSince ? `, where I've been a member since ${data.memberSince}` : ""}.
      </p>

      {rapidPercentile != null ? (
        <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-signal/50 bg-[var(--accent-wash)] px-3.5 py-1.5 font-mono text-[0.75rem] tracking-wide text-ink">
          Top {Math.max(1, Math.round(100 - rapidPercentile))}% of rapid players
          <span className="text-ink-3">· better than {rapidPercentile}%</span>
        </p>
      ) : null}

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
        <Stat label="Rapid rating" value={data.rapid} accent />
        <Stat label="Peak rapid" value={data.rapidBest} />
        <Stat label="Peak puzzles" value={data.puzzlesBest} />
        <Stat label="Games played" value={data.games} />
      </dl>

      {record && total > 0 ? (
        <div className="mt-7">
          <div
            className="flex h-2 overflow-hidden rounded-full bg-line"
            role="img"
            aria-label={`Rapid record: ${fmt.format(record.win)} wins, ${fmt.format(record.loss)} losses, ${fmt.format(record.draw)} draws`}
          >
            <span className="h-full bg-signal" style={{ width: `${pct(record.win)}%` }} />
            <span className="h-full bg-ink-3" style={{ width: `${pct(record.draw)}%` }} />
            <span className="h-full bg-line-strong" style={{ width: `${pct(record.loss)}%` }} />
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.72rem] text-ink-3">
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2 rounded-full bg-signal" />
              {fmt.format(record.win)} won
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2 rounded-full bg-ink-3" />
              {fmt.format(record.draw)} drawn
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2 rounded-full bg-line-strong" />
              {fmt.format(record.loss)} lost
            </li>
          </ul>
        </div>
      ) : null}

      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        className="link mt-7 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm"
      >
        Challenge {username} on chess.com
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </a>
    </article>
  );
}

function Stat({ label, value, accent }: { label: string; value: number | null; accent?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">{label}</dt>
      <dd
        className={
          accent
            ? "mt-1.5 font-heading text-3xl font-semibold tracking-tight text-signal tabular-nums"
            : "mt-1.5 font-heading text-3xl font-semibold tracking-tight text-ink tabular-nums"
        }
      >
        {value === null ? "–" : fmt.format(value)}
      </dd>
    </div>
  );
}
