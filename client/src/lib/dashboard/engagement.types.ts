export type EngagementDay = {
  date: string;
  likes: number;
  comments: number;
  views: number;
  impressions: number;
  posts: number;
};

export type EngagementMetric = "likes" | "comments" | "views" | "impressions";

export const ENGAGEMENT_COLORS: Record<EngagementMetric, string> = {
  likes: "#ef4444",
  comments: "#a855f7",
  views: "#06b6d4",
  impressions: "#22c55e",
};

export const ENGAGEMENT_LABELS: Record<EngagementMetric, string> = {
  likes: "Likes",
  comments: "Comments",
  views: "Views",
  impressions: "Impress.",
};
