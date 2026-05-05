import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PlatformBreakdown } from "@/types/analytics";

export function PlatformBreakdownCard({
  platforms,
}: { platforms: PlatformBreakdown[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Per-platform performance</CardTitle>
        <CardDescription>
          Numbers reported by each connected platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {platforms.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No platform data yet.
          </p>
        ) : platforms.map((p) => (
          <div key={p.platform}
            className="flex items-center justify-between rounded-md border p-3 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {p.platform}
              </Badge>
              {p.status !== "ok" && (
                <span className="text-xs text-muted-foreground">
                  {p.status}
                </span>
              )}
            </div>
            <div className="flex gap-4 text-xs tabular-nums text-muted-foreground">
              <span>{p.metrics.likes.toLocaleString()} likes</span>
              <span>{p.metrics.comments.toLocaleString()} comments</span>
              <span>{p.metrics.shares.toLocaleString()} shares</span>
              <span>{p.metrics.impressions.toLocaleString()} impr.</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
