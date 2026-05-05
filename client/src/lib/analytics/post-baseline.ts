import type { PostMetrics } from "@/types/analytics";

const ZERO: PostMetrics = {
  impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0,
  saves: 0, clicks: 0, views: 0, engagementRate: 0,
};

const KEYS = Object.keys(ZERO) as (keyof PostMetrics)[];

export function computeBaseline(
  metricsMap: Map<string, PostMetrics>, excludeId: string,
): { avg: PostMetrics; sampleSize: number } {
  const others = [...metricsMap.entries()]
    .filter(([id]) => id !== excludeId)
    .map(([, m]) => m);
  if (others.length === 0) return { avg: ZERO, sampleSize: 0 };
  const sum: PostMetrics = { ...ZERO };
  for (const m of others) {
    for (const k of KEYS) sum[k] += m[k];
  }
  const avg: PostMetrics = { ...ZERO };
  for (const k of KEYS) avg[k] = sum[k] / others.length;
  return { avg, sampleSize: others.length };
}
