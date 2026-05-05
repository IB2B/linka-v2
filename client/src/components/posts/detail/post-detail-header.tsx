import { PostStatusBadge } from "../post-status-badge";
import { formatFullDate } from "@/lib/posts/format-detail-date";
import type { GeneratedPost } from "@/types/post";

export function PostDetailHeader({ post }: { post: GeneratedPost }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b pb-4">
      <PostStatusBadge status={post.status} />
      <span className="text-xs text-muted-foreground">
        Created {formatFullDate(post.createdAt)}
      </span>
    </div>
  );
}
