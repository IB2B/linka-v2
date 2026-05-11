import type { PostMetrics, PostSnapshot } from "@/types/analytics";
import type { PostComment, PostCommentGroup } from "./post-comments.types";

const ZERO: PostMetrics = {
  impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0,
  saves: 0, clicks: 0, views: 0, engagementRate: 0,
};

const KEYS = Object.keys(ZERO) as (keyof PostMetrics)[];

function flatten(groups: PostCommentGroup[]): PostComment[] {
  const out: PostComment[] = [];
  const walk = (cs: PostComment[]) => {
    for (const c of cs) { out.push(c); walk(c.replies); }
  };
  for (const g of groups) walk(g.comments);
  return out;
}

function forwardFill(points: PostSnapshot[]): PostSnapshot[] {
  const out: PostSnapshot[] = [];
  let prev: PostMetrics = { ...ZERO };
  for (const p of points) {
    const merged: PostMetrics = { ...prev };
    for (const k of KEYS) merged[k] = Math.max(prev[k], p.metrics[k]);
    out.push({ fetchedAt: p.fetchedAt, metrics: merged });
    prev = merged;
  }
  return out;
}

export function synthesizeSeries(
  postedAt: string | null,
  realSeries: PostSnapshot[],
  groups: PostCommentGroup[],
  totals: PostMetrics | null,
): PostSnapshot[] {
  const comments = flatten(groups)
    .map((c) => c.createdAt)
    .filter((d): d is string => !!d)
    .sort((a, b) => a.localeCompare(b));

  const points: PostSnapshot[] = [];
  if (postedAt) points.push({ fetchedAt: postedAt, metrics: { ...ZERO } });
  comments.forEach((at, i) => {
    points.push({ fetchedAt: at, metrics: { ...ZERO, comments: i + 1 } });
  });
  for (const s of realSeries) points.push(s);
  if (totals) points.push({ fetchedAt: new Date().toISOString(), metrics: totals });

  points.sort((a, b) => a.fetchedAt.localeCompare(b.fetchedAt));
  return forwardFill(points);
}
