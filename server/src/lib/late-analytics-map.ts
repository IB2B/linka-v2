import type { PostMetrics, PlatformBreakdown } from "../types/analytics";

const ZERO: PostMetrics = {
  impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0,
  saves: 0, clicks: 0, views: 0, engagementRate: 0,
};

const num = (v: unknown): number => (typeof v === "number" ? v : 0);

export function toMetrics(raw: unknown): PostMetrics {
  if (!raw || typeof raw !== "object") return ZERO;
  const r = raw as Record<string, unknown>;
  return {
    impressions: num(r.impressions),
    reach: num(r.reach),
    likes: num(r.likes),
    comments: num(r.comments),
    shares: num(r.shares),
    saves: num(r.saves),
    clicks: num(r.clicks),
    views: num(r.views),
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
    };
  });
}
