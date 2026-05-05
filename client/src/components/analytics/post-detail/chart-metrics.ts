import type { PostMetrics } from "@/types/analytics";

export type ChartMetric = Extract<
  keyof PostMetrics,
  "views" | "impressions" | "likes" | "comments" | "shares" | "clicks"
>;

export const CHART_METRICS: { key: ChartMetric; label: string }[] = [
  { key: "views", label: "Views" },
  { key: "impressions", label: "Impr." },
  { key: "likes", label: "Likes" },
  { key: "comments", label: "Comm." },
  { key: "shares", label: "Shares" },
  { key: "clicks", label: "Clicks" },
];
