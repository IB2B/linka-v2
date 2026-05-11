export type PostMetrics = {
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
  views: number;
  engagementRate: number;
};

export type PlatformBreakdown = {
  platform: string;
  status: "ok" | "pending" | "failed";
  metrics: PostMetrics;
  error?: string | null;
  accountId?: string | null;
};

export type PostAnalyticsResult =
  | { state: "unposted" }
  | { state: "syncing" }
  | { state: "addon-required" }
  | { state: "ok"; totals: PostMetrics; platforms: PlatformBreakdown[] };

export type PostSnapshot = {
  fetchedAt: string;
  metrics: PostMetrics;
};
