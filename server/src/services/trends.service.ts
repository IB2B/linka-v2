import { db } from "../lib/db";
import { tavilySearch, type TavilyResult } from "../lib/tavily";
import { buildTrendQuery } from "../lib/trend-query";
import { searchTopic } from "../lib/trend-search";
import { rankRelevant } from "../lib/trend-relevance";
import type { TrendLocale } from "../lib/trend-query-i18n";
import { buildTrendRows, replaceTrends } from "../lib/trend-write";

// Prefer articles the user hasn't just seen so a repeat refresh on the same
// topic brings new news; top up with seen ones only if the fresh pool is thin.
async function pickFresh(userId: string, pool: TavilyResult[]): Promise<TavilyResult[]> {
  const [rows] = await db.query<any[]>("SELECT url FROM trends WHERE user_id = ?", [userId]);
  const seen = new Set((rows as { url: string }[]).map((r) => r.url));
  const uniq = [...new Map(pool.map((r) => [r.url, r])).values()];
  const fresh = uniq.filter((r) => !seen.has(r.url));
  const rest = uniq.filter((r) => seen.has(r.url));
  return [...fresh, ...rest].slice(0, 8);
}

export async function refreshTrends(
  userId: string, topic?: string, locale: TrendLocale = "en",
): Promise<number> {
  const t = topic?.trim();
  // User topics get expanded multi-query web search + postability ranking; the
  // profile-based default keeps the lighter recent-news sweep.
  const pool = t
    ? await searchTopic(t, locale)
    : await tavilySearch(await buildTrendQuery(userId, undefined, locale), 20);
  if (pool.length === 0) return 0;
  const scoped = t ? await rankRelevant(t, pool) : pool;
  const results = await pickFresh(userId, scoped);
  const rows = await buildTrendRows(results, locale);
  await replaceTrends(userId, rows);
  return rows.length;
}
