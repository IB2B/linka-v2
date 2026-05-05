import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { EngagementMixRow } from "./engagement-mix-row";
import type { PostMetrics } from "@/types/analytics";

const ROWS: { key: keyof PostMetrics; label: string; color: string }[] = [
  { key: "likes", label: "Likes", color: "bg-pink-500" },
  { key: "comments", label: "Comments", color: "bg-blue-500" },
  { key: "shares", label: "Shares", color: "bg-emerald-500" },
  { key: "saves", label: "Saves", color: "bg-amber-500" },
  { key: "clicks", label: "Clicks", color: "bg-violet-500" },
];

export function EngagementMixCard({ totals }: { totals: PostMetrics }) {
  const total = ROWS.reduce((s, r) => s + totals[r.key], 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement mix</CardTitle>
        <CardDescription>
          How people interacted with this post.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {total === 0 ? (
          <p className="text-sm text-muted-foreground">No engagement yet.</p>
        ) : ROWS.map((r) => (
          <EngagementMixRow
            key={r.key} label={r.label}
            value={totals[r.key]} total={total} color={r.color}
          />
        ))}
      </CardContent>
    </Card>
  );
}
