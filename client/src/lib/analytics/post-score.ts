import type { PostMetrics } from "@/types/analytics";

const WEIGHTS: Partial<Record<keyof PostMetrics, number>> = {
  likes: 1, comments: 3, shares: 5, saves: 4, clicks: 2,
};

function weightedScore(m: PostMetrics): number {
  let s = 0;
  for (const [k, w] of Object.entries(WEIGHTS)) {
    s += m[k as keyof PostMetrics] * (w ?? 0);
  }
  return s;
}

export type ScoreResult = { score: number; percentile: number };

export function computeScore(
  current: PostMetrics, others: PostMetrics[],
): ScoreResult | null {
  if (others.length === 0) return null;
  const me = weightedScore(current);
  const scores = others.map(weightedScore).sort((a, b) => a - b);
  const below = scores.filter((s) => s <= me).length;
  const percentile = Math.round((below / scores.length) * 100);
  return { score: percentile, percentile };
}
