import { PostStatusBadge } from "@/components/posts/post-status-badge";
import { formatPostDate } from "@/lib/posts/format-date";
import type { GeneratedPost } from "@/types/post";

export function RecentPostRow({ post }: { post: GeneratedPost }) {
  const preview = post.content.slice(0, 90).trim();
  return (
    <div className="flex items-start justify-between gap-3 border-b py-2.5 last:border-b-0">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="line-clamp-1 text-sm text-foreground/90">
          {preview || "Untitled post"}
        </p>
        <div className="flex items-center gap-2">
          <PostStatusBadge status={post.status} />
          {post.platform ? (
            <span className="text-xs text-muted-foreground capitalize">
              {post.platform}
            </span>
          ) : null}
        </div>
      </div>
      <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
        {formatPostDate(post.createdAt)}
      </span>
    </div>
  );
}
