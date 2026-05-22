import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { listTrendsWithIdeas } from "../lib/trends-read";
import { refreshTrends } from "../services/trends.service";
import { suggestTrendTopics } from "../lib/trend-topic-suggestions";

function mapTrend(t: { id: string; title: string; url: string | null;
  source: string | null; summary: string | null; score: number; fetched_at: Date }) {
  return {
    id: t.id, title: t.title, url: t.url, source: t.source,
    summary: t.summary, score: t.score, fetchedAt: t.fetched_at,
  };
}

export async function getTrends(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const [{ trends, ideas }, suggestedTopics] = await Promise.all([
      listTrendsWithIdeas(userId),
      suggestTrendTopics(userId),
    ]);
    res.json({
      trends: trends.map(mapTrend),
      ideas: ideas.map((i) => ({
        id: i.id, trendId: i.trend_id, hook: i.hook,
        angle: i.angle, platform: i.platform, score: i.score,
      })),
      suggestedTopics,
    });
  } catch (e) { next(e); }
}

export async function postRefresh(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const topic = typeof req.body?.topic === "string" ? req.body.topic.slice(0, 120) : undefined;
    const count = await refreshTrends(req.user!.id, topic);
    res.json({ refreshed: count });
  } catch (e) { next(e); }
}
