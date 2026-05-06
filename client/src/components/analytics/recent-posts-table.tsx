import {
  Card, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { RecentPostsRow } from "./recent-posts-row";
import type { GeneratedPost } from "@/types/post";
import type { PostMetrics } from "@/types/analytics";

export function RecentPostsTable({
  posts, metrics, published,
}: {
  posts: GeneratedPost[];
  metrics: Map<string, PostMetrics>;
  published: Map<string, string[]>;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>
          Your last {posts.length} posts in this window.
        </CardDescription>
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
                  publishedPlatforms={published.get(p.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
