import type { GeneratedPost } from "@/types/post";
import type { AnalyticsDaily } from "@/lib/analytics/analytics.types";

const DAYS = 14;

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function buildDaily(posts: GeneratedPost[]): AnalyticsDaily[] {
  const buckets = new Map<string, number>();
  const now = new Date();
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    buckets.set(isoDay(d), 0);
  }
  for (const p of posts) {
    const key = isoDay(new Date(p.createdAt));
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return Array.from(buckets.entries()).map(([date, count]) => ({ date, count }));
}
