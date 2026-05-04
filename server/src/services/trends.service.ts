import { randomUUID } from "node:crypto";

import { db } from "../lib/db";
import { tavilySearch } from "../lib/tavily";
import { buildTrendQuery } from "../lib/trend-query";
import { generateIdeas } from "./trend-ideas.service";

function hostFromUrl(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

export async function refreshTrends(userId: string, topic?: string): Promise<number> {
  const query = await buildTrendQuery(userId, topic);
  const results = await tavilySearch(query, 8);
  if (results.length === 0) return 0;

  await db.query("DELETE FROM trends WHERE user_id = ?", [userId]);

  for (const r of results) {
    const trendId = randomUUID();
    const score = Math.min(100, Math.round((r.score ?? 0.5) * 100));
    await db.query(
      `INSERT INTO trends (id, user_id, title, url, source, summary, score)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [trendId, userId, r.title.slice(0, 255), r.url, hostFromUrl(r.url),
        r.content.slice(0, 1000), score],
    );
    const ideas = await generateIdeas(r.title, r.content.slice(0, 800));
    for (const idea of ideas) {
      await db.query(
        `INSERT INTO trend_ideas (id, trend_id, user_id, hook, angle, platform, score)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [randomUUID(), trendId, userId, idea.hook.slice(0, 500),
          idea.angle, idea.platform, idea.score],
      );
    }
  }
  return results.length;
}
