import type { GeneratedPost, PostStatus } from "@/types/post";
import type { Analytics, AnalyticsBucket } from "./analytics.types";
import { STATUS_LABEL, STATUS_ORDER } from "./status-labels";
import { buildDaily } from "./daily-buckets";
import { buildWindows, inWindow } from "./filter-range";
import { makeDelta } from "./delta";
import { computeInsights } from "./insights";
import type { RangeKey } from "./range";
import { rangeDays } from "./range";

const RECENT_LIMIT = 10;

function statusBuckets(posts: GeneratedPost[]): AnalyticsBucket[] {
  const counts = Object.fromEntries(
    STATUS_ORDER.map((s) => [s, 0]),
  ) as Record<PostStatus, number>;
  for (const p of posts) counts[p.status] += 1;
  return STATUS_ORDER.map((s) => ({
    key: s, label: STATUS_LABEL[s], count: counts[s],
  }));
}

function platformBuckets(posts: GeneratedPost[]): AnalyticsBucket[] {
  const counts = new Map<string, number>();
  for (const p of posts) {
    const key = p.platform ?? "unspecified";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts, ([key, count]) => ({
    key, label: platformLabel(key), count,
  })).sort((a, b) => b.count - a.count);
}

function platformLabel(key: string): string {
  if (key === "unspecified") return "Unspecified";
  if (key === "linkedin") return "LinkedIn";
  if (key === "tiktok") return "TikTok";
  if (key === "youtube") return "YouTube";
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function bucketCount(b: AnalyticsBucket[], key: PostStatus): number {
  return b.find((x) => x.key === key)?.count ?? 0;
}

export function computeAnalytics(
  allPosts: GeneratedPost[],
  range: RangeKey,
): Analytics {
  const days = rangeDays(range);
  const { current, previous } = buildWindows(days);
  const inRange = allPosts.filter((p) => inWindow(p, current));
  const inPrev = allPosts.filter((p) => inWindow(p, previous));
  const byStatus = statusBuckets(inRange);
  const prevStatus = statusBuckets(inPrev);
  const byPlatform = platformBuckets(inRange);
  const daily = buildDaily(inRange, range);
  return {
    stats: {
      total: makeDelta(inRange.length, inPrev.length),
      posted: makeDelta(bucketCount(byStatus, "posted"), bucketCount(prevStatus, "posted")),
      scheduled: makeDelta(bucketCount(byStatus, "scheduled"), bucketCount(prevStatus, "scheduled")),
      drafts: makeDelta(bucketCount(byStatus, "draft"), bucketCount(prevStatus, "draft")),
    },
    byStatus, byPlatform, daily,
    insights: computeInsights(inRange, daily, byPlatform),
    recent: [...inRange]
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
      .slice(0, RECENT_LIMIT),
  };
}
