import type { GeneratedPost } from "@/types/post";
import type { AnalyticsBucket, AnalyticsDaily, AnalyticsInsights } from "./analytics.types";

export function computeInsights(
  posts: GeneratedPost[],
  daily: AnalyticsDaily[],
  byPlatform: AnalyticsBucket[],
): AnalyticsInsights {
  const bestDay = daily.reduce<AnalyticsInsights["bestDay"]>((best, d) => {
    if (d.count === 0) return best;
    if (!best || d.count > best.count) return { date: d.date, count: d.count };
    return best;
  }, null);

  const totalDays = daily.length || 1;
  const totalInRange = daily.reduce((s, d) => s + d.count, 0);
  const avgPerDay = Math.round((totalInRange / totalDays) * 10) / 10;

  const topPlatform = byPlatform[0]
    ? { label: byPlatform[0].label, count: byPlatform[0].count }
    : null;

  const withImage = posts.filter((p) => p.imageUrl).length;
  const imageAttachRate = posts.length === 0
    ? 0
    : Math.round((withImage / posts.length) * 100);

  return { bestDay, avgPerDay, topPlatform, imageAttachRate };
}
