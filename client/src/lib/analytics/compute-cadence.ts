import type { DailyEngagementRow } from "./get-daily-engagement";

export type CadencePoint = {
  date: string;
  postsPosted: number;
  totalEngagement: number;
};

export function computeCadence(series: DailyEngagementRow[]): CadencePoint[] {
  return series.map((d) => ({
    date: d.date,
    postsPosted: d.posts,
    totalEngagement: d.likes + d.comments,
  }));
}

export type CadenceInsight = {
  optimalPostsPerDay: number;
  avgEngagementAtOptimal: number;
};

export function computeCadenceInsight(points: CadencePoint[]): CadenceInsight | null {
  const active = points.filter((p) => p.postsPosted > 0);
  if (active.length === 0) return null;
  const byCount = new Map<number, number[]>();
  for (const p of active) {
    const bucket = byCount.get(p.postsPosted) ?? [];
    bucket.push(p.totalEngagement);
    byCount.set(p.postsPosted, bucket);
  }
  let best = { count: 0, avg: 0 };
  for (const [count, engagements] of byCount) {
    const avg = engagements.reduce((s, n) => s + n, 0) / engagements.length;
    if (avg > best.avg) best = { count, avg };
  }
  return {
    optimalPostsPerDay: best.count,
    avgEngagementAtOptimal: Math.round(best.avg),
  };
}
