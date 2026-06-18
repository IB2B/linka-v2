import { randomUUID } from "node:crypto";

import { db } from "./db";
import type { TavilyResult } from "./tavily";
import type { TrendLocale } from "./trend-query-i18n";
import { generateTrendDraft, type IdeaDraft } from "../services/trend-ideas.service";

export type BuiltTrend = {
  id: string; title: string; url: string; source: string;
  summary: string; score: number; ideas: IdeaDraft[];
};

function hostFromUrl(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

// Generate AI drafts for every article up front, before touching the board,
// so an LLM failure can never leave the user with deleted-but-unreplaced trends.
export async function buildTrendRows(
  results: TavilyResult[], locale: TrendLocale,
): Promise<BuiltTrend[]> {
  const built: BuiltTrend[] = [];
  for (const r of results) {
    const draft = await generateTrendDraft(r.title, r.content.slice(0, 800), locale);
    built.push({
      id: randomUUID(),
      title: r.title.slice(0, 255),
      url: r.url,
      source: hostFromUrl(r.url),
      summary: (draft.summary || r.content.slice(0, 1000)).slice(0, 1000),
      score: Math.min(100, Math.round((r.score ?? 0.5) * 100)),
      ideas: draft.ideas,
    });
  }
  return built;
}

// Swap the board atomically: the old trends survive if any insert fails.
export async function replaceTrends(userId: string, rows: BuiltTrend[]): Promise<void> {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM trends WHERE user_id = ?", [userId]);
    for (const t of rows) {
      await conn.query(
        `INSERT INTO trends (id, user_id, title, url, source, summary, score)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [t.id, userId, t.title, t.url, t.source, t.summary, t.score],
      );
      for (const idea of t.ideas) {
        await conn.query(
          `INSERT INTO trend_ideas (id, trend_id, user_id, hook, angle, platform, score)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [randomUUID(), t.id, userId, idea.hook.slice(0, 500),
            idea.angle, idea.platform, idea.score],
        );
      }
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}
