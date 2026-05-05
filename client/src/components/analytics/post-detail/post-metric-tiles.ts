import {
  Eye, Heart, MessageCircle, Share2, Bookmark, MousePointerClick,
  TrendingUp, Users,
} from "lucide-react";
import type { PostMetrics } from "@/types/analytics";

export type Tile = {
  key: keyof PostMetrics;
  label: string;
  icon: typeof Eye;
  format?: "percent";
};

export const TILES: Tile[] = [
  { key: "impressions", label: "Impressions", icon: Eye },
  { key: "reach", label: "Reach", icon: Users },
  { key: "likes", label: "Likes", icon: Heart },
  { key: "comments", label: "Comments", icon: MessageCircle },
  { key: "shares", label: "Shares", icon: Share2 },
  { key: "saves", label: "Saves", icon: Bookmark },
  { key: "clicks", label: "Clicks", icon: MousePointerClick },
  { key: "engagementRate", label: "Engagement", icon: TrendingUp,
    format: "percent" },
];

export function formatTile(value: number, format?: "percent"): string {
  if (format === "percent") return `${(value * 100).toFixed(1)}%`;
  return value.toLocaleString();
}
