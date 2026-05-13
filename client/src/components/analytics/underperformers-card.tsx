import Link from "next/link";
import { TrendingDown } from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { UnderperformerPost } from "@/lib/analytics/compute-underperformers";

export function UnderperformersCard({ posts }: { posts: UnderperformerPost[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="size-4 text-destructive" />
          Underperformers
        </CardTitle>
        <CardDescription>
          Published posts with significant reach but low engagement — worth revisiting your hook or CTA.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Not enough data yet — needs at least 4 published posts with metrics.
          </p>
        ) : (
          <div className="space-y-2">
            {posts.map(({ post, metrics, percentile }) => (
              <Link key={post.id} href={`/dashboard/posts/${post.id}`}
                className="flex items-start justify-between gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/40">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium leading-snug">
                    {post.content.slice(0, 80)}{post.content.length > 80 ? "…" : ""}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {metrics.impressions.toLocaleString()} impressions · {metrics.likes} likes · {metrics.comments} comments
                  </p>
                </div>
                <Badge variant="outline" className="shrink-0 text-destructive border-destructive/30">
                  p{percentile}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
