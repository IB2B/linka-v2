import type { PostMetrics } from "@/types/analytics";

export type TrendSeries = {
  key: keyof PostMetrics;
  label: string;
  color: string;
};

export const TREND_SERIES: TrendSeries[] = [
  { key: "likes", label: "Likes", color: "#ec4899" },
  { key: "comments", label: "Comments", color: "#3b82f6" },
  { key: "shares", label: "Shares", color: "#10b981" },
];
