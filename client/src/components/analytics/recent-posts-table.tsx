import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Card, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostsAnalyticsTable } from "./posts-analytics-table";
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
              Your {posts.length} most recently posted.
            </CardDescription>
          </div>
          <Button
            render={<Link href="/dashboard/analytics/posts" />}
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
          No posted posts yet.
        </p>
      ) : (
        <PostsAnalyticsTable posts={posts} metrics={metrics} />
      )}
    </Card>
  );
}
