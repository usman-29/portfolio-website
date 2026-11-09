/**
 * chess.com public API (no key needed, CORS open).
 * Stats are fetched once at build time and refreshed in the browser on load.
 * If both fail, the snapshot below is shown.
 */

export type ChessSummary = {
  rapid: number | null;
  rapidBest: number | null;
  puzzlesBest: number | null;
  games: number;
  rapidRecord: { win: number; loss: number; draw: number } | null;
  memberSince: number | null;
  /** ISO date the numbers were read. */
  asOf: string;
};

/** Snapshot taken 2026-11-09, used only if chess.com can't be reached. */
export const CHESS_SNAPSHOT: ChessSummary = {
  rapid: 1371,
  rapidBest: 1476,
  puzzlesBest: 1647,
  games: 8535,
  rapidRecord: { win: 2797, loss: 2725, draw: 202 },
  memberSince: 2017,
  asOf: "2026-11-09",
};

type Record = { win?: number; loss?: number; draw?: number };
type Mode = { last?: { rating?: number }; best?: { rating?: number }; record?: Record };
type StatsResponse = {
  chess_rapid?: Mode;
  chess_blitz?: Mode;
  chess_bullet?: Mode;
  chess_daily?: Mode;
  chess960_daily?: Mode;
  tactics?: { highest?: { rating?: number } };
};
type ProfileResponse = { joined?: number };

const API = "https://api.chess.com/pub/player";

function played(r?: Record) {
  return (r?.win ?? 0) + (r?.loss ?? 0) + (r?.draw ?? 0);
}

export function summarise(stats: StatsResponse, profile?: ProfileResponse): ChessSummary {
  const rapid = stats.chess_rapid;
  const modes = [
    stats.chess_rapid,
    stats.chess_blitz,
    stats.chess_bullet,
    stats.chess_daily,
    stats.chess960_daily,
  ];
  return {
    rapid: rapid?.last?.rating ?? null,
    rapidBest: rapid?.best?.rating ?? null,
    puzzlesBest: stats.tactics?.highest?.rating ?? null,
    games: modes.reduce((sum, m) => sum + played(m?.record), 0),
    rapidRecord: rapid?.record
      ? {
          win: rapid.record.win ?? 0,
          loss: rapid.record.loss ?? 0,
          draw: rapid.record.draw ?? 0,
        }
      : null,
    memberSince: profile?.joined ? new Date(profile.joined * 1000).getUTCFullYear() : null,
    asOf: new Date().toISOString().slice(0, 10),
  };
}

export async function fetchChess(username: string, signal?: AbortSignal): Promise<ChessSummary> {
  const [statsRes, profileRes] = await Promise.all([
    fetch(`${API}/${username}/stats`, { signal }),
    fetch(`${API}/${username}`, { signal }),
  ]);
  if (!statsRes.ok) throw new Error(`chess.com stats: ${statsRes.status}`);
  const stats = (await statsRes.json()) as StatsResponse;
  const profile = profileRes.ok ? ((await profileRes.json()) as ProfileResponse) : undefined;
  return summarise(stats, profile);
}

/** Build-time read with a timeout; falls back to the snapshot. */
export async function getChessAtBuild(username: string): Promise<ChessSummary> {
  try {
    return await fetchChess(username, AbortSignal.timeout(8000));
  } catch {
    return CHESS_SNAPSHOT;
  }
}
