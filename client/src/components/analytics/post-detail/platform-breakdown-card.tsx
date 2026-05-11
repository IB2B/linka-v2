import { Loader2, AlertCircle } from "lucide-react";

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
          <p className="text-sm text-muted-foreground">No platform data yet.</p>
        ) : platforms.map((p) => (
          <PlatformRow key={p.platform} p={p} />
        ))}
      </CardContent>
    </Card>
  );
}

function PlatformRow({ p }: { p: PlatformBreakdown }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="capitalize">{p.platform}</Badge>
        <PlatformStatus p={p} />
      </div>
      {p.status === "ok" ? (
        <div className="flex gap-4 text-xs tabular-nums text-muted-foreground">
          <span>{p.metrics.likes.toLocaleString()} likes</span>
          <span>{p.metrics.comments.toLocaleString()} comments</span>
          <span>{p.metrics.shares.toLocaleString()} shares</span>
          <span>{p.metrics.impressions.toLocaleString()} impr.</span>
        </div>
      ) : null}
    </div>
  );
}

function PlatformStatus({ p }: { p: PlatformBreakdown }) {
  if (p.status === "pending") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
        <Loader2 className="size-3 animate-spin" /> Syncing…
      </span>
    );
  }
  if (p.status === "failed") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400"
        title={p.error ?? undefined}>
        <AlertCircle className="size-3" /> Failed
      </span>
    );
  }
  return null;
}
