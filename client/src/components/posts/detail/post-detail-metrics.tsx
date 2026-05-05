import {
  Eye, Heart, MessageCircle, Share2, Bookmark, MousePointerClick,
} from "lucide-react";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { getPostAnalytics } from "@/lib/analytics/get-post-analytics";
import { MetricStatRow } from "./metric-stat-row";
import type { PostMetrics } from "@/types/analytics";

const ROWS: { key: keyof PostMetrics; label: string; icon: typeof Eye }[] = [
  { key: "views", label: "Views", icon: Eye },
  { key: "likes", label: "Likes", icon: Heart },
  { key: "comments", label: "Comments", icon: MessageCircle },
  { key: "shares", label: "Shares", icon: Share2 },
  { key: "saves", label: "Saves", icon: Bookmark },
  { key: "clicks", label: "Clicks", icon: MousePointerClick },
];

export async function PostDetailMetrics({ postId }: { postId: string }) {
  const a = await getPostAnalytics(postId);
  if (a?.state !== "ok") return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Performance</CardTitle>
        <CardDescription className="text-xs">
          Live metrics from Late.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1.5">
        {ROWS.map((r) => (
          <MetricStatRow
            key={r.key} label={r.label} icon={r.icon}
            value={a.totals[r.key]}
          />
        ))}
      </CardContent>
    </Card>
  );
}
