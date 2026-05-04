import { db } from "./db";

export type TrendRow = {
  id: string; title: string; url: string | null; source: string | null;
  summary: string | null; score: number; fetched_at: Date;
};

export type IdeaRow = {
  id: string; trend_id: string; hook: string;
  angle: string | null; platform: string | null; score: number;
};

export async function listTrendsWithIdeas(userId: string) {
  const [trendsRaw] = await db.query<any[]>(
    `SELECT id, title, url, source, summary, score, fetched_at
     FROM trends WHERE user_id = ? ORDER BY score DESC, fetched_at DESC LIMIT 20`,
    [userId],
  );
  const trends = trendsRaw as TrendRow[];
  if (trends.length === 0) return { trends, ideas: [] as IdeaRow[] };
  const ids = trends.map((t) => t.id);
  const placeholders = ids.map(() => "?").join(",");
  const [ideasRaw] = await db.query<any[]>(
    `SELECT id, trend_id, hook, angle, platform, score
     FROM trend_ideas WHERE trend_id IN (${placeholders}) ORDER BY score DESC`,
    ids,
  );
  return { trends, ideas: ideasRaw as IdeaRow[] };
}
