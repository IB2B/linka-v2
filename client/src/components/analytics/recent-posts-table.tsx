import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Card, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecentPostsRow } from "./recent-posts-row";
import type { GeneratedPost } from "@/types/post";
import type { PostMetrics } from "@/types/analytics";

export function RecentPostsTable({
  posts, metrics,
}: {
  posts: GeneratedPost[];
  metrics: Map<string, PostMetrics>;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              Your last {posts.length} posts in this window.
            </CardDescription>
          </div>
          <Button
            render={<Link href="/dashboard/posts" />}
            nativeButton={false}
            variant="ghost"
            size="sm"
          >
            View all <ArrowRight className="size-4" />
          </Button>
        </div>
      </CardHeader>
      {posts.length === 0 ? (
        <p className="px-6 pb-6 text-sm text-muted-foreground">
          No posts in this window yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-2 font-medium">Post</th>
                <th className="px-4 py-2 font-medium">Platform</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 text-right font-medium">Views</th>
                <th className="px-4 py-2 text-right font-medium">Likes</th>
                <th className="px-4 py-2 text-right font-medium">Comments</th>
                <th className="px-4 py-2 text-right font-medium">Shares</th>
                <th className="px-4 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <RecentPostsRow
                  key={p.id}
                  post={p}
                  metrics={metrics.get(p.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
