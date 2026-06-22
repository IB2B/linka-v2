import { RecentPostsRow } from "./recent-posts-row";
import type { GeneratedPost } from "@/types/post";
import type { PostMetrics } from "@/types/analytics";

// Shared post×metrics table used by the Analytics "Recent activity" card and
// the full "All posts" analytics page. Rows link to per-post analytics.
export function PostsAnalyticsTable({
  posts, metrics,
}: {
  posts: GeneratedPost[];
  metrics: Map<string, PostMetrics>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-2 font-medium">Post</th>
            <th className="px-4 py-2 font-medium">Platform</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 text-right font-medium">Impressions</th>
            <th className="px-4 py-2 text-right font-medium">Reach</th>
            <th className="px-4 py-2 text-right font-medium">Likes</th>
            <th className="px-4 py-2 text-right font-medium">Comments</th>
            <th className="px-4 py-2 text-right font-medium">Shares</th>
            <th className="px-4 py-2 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <RecentPostsRow key={p.id} post={p} metrics={metrics.get(p.id)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
