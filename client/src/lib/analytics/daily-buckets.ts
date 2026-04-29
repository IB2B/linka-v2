import type { GeneratedPost } from "@/types/post";
import type { AnalyticsDaily } from "./analytics.types";
import type { RangeKey } from "./range";

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function dayCount(range: RangeKey): number {
  if (range === "7") return 7;
  if (range === "90") return 30;
  return 30;
}

export function buildDaily(
  posts: GeneratedPost[],
  range: RangeKey = "30",
): AnalyticsDaily[] {
  const days = dayCount(range);
  const counts = new Map<string, number>();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - i);
    counts.set(isoDay(d), 0);
  }
  for (const p of posts) {
    const key = isoDay(new Date(p.createdAt));
    if (counts.has(key)) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts, ([date, count]) => ({ date, count }));
}
