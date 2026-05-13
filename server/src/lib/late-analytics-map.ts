import type { PostMetrics, PlatformBreakdown } from "../types/analytics";

const ZERO: PostMetrics = {
  impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0,
  saves: 0, clicks: 0, views: 0, engagementRate: 0,
};

const KEYS = Object.keys(ZERO) as (keyof PostMetrics)[];

export function aggregateFromPlatforms(
  platforms: PlatformBreakdown[],
): PostMetrics {
  const synced = platforms.filter((p) => p.status === "ok");
  if (synced.length === 0) return { ...ZERO };
  const sum: PostMetrics = { ...ZERO };
  for (const p of synced) {
    for (const k of KEYS) {
      if (k === "engagementRate") continue;
      sum[k] += p.metrics[k];
    }
  }
  const denom = sum.impressions || sum.reach || sum.views;
  sum.engagementRate = denom === 0
    ? 0
    : (sum.likes + sum.comments + sum.shares + sum.saves) / denom;
  return sum;
}

const num = (v: unknown): number => (typeof v === "number" ? v : 0);

// LinkedIn returns count-suffixed keys; we prefer the normalised form if present.
const pick = (r: Record<string, unknown>, ...keys: string[]): number => {
  for (const k of keys) if (typeof r[k] === "number") return r[k] as number;
  return 0;
};

export function toMetrics(raw: unknown): PostMetrics {
  if (!raw || typeof raw !== "object") return ZERO;
  const r = raw as Record<string, unknown>;
  return {
    impressions: pick(r, "impressions", "impressionCount"),
    reach: pick(r, "reach", "uniqueImpressionsCount", "memberReached", "reachCount"),
    likes: pick(r, "likes", "likeCount", "reactionCount"),
    comments: pick(r, "comments", "commentCount"),
    shares: pick(r, "shares", "shareCount", "repostCount"),
    saves: pick(r, "saves", "saveCount", "bookmarkCount"),
    clicks: pick(r, "clicks", "clickCount"),
    views: pick(r, "views", "viewCount", "videoViewCount"),
    engagementRate: num(r.engagementRate),
  };
}

export function toPlatforms(raw: unknown): PlatformBreakdown[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((p) => {
    const r = (p ?? {}) as Record<string, unknown>;
    const status: PlatformBreakdown["status"] =
      r.status === "failed" ? "failed"
      : r.syncStatus === "pending" || r.syncStatus === "unavailable" ? "pending"
      : "ok";
    return {
      platform: String(r.platform ?? "unknown"),
      status,
      metrics: toMetrics(r.analytics),
      error: typeof r.errorMessage === "string" ? r.errorMessage : null,
      accountId: typeof r.accountId === "string" ? r.accountId : null,
    };
  });
}
