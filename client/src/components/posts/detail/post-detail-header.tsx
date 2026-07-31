import { PostStatusBadge } from "../post-status-badge";
import { formatFullDate } from "@/lib/posts/format-detail-date";
import type { GeneratedPost } from "@/types/post";

export function PostDetailHeader({ post }: { post: GeneratedPost }) {
  return (
    <div className="flex flex-col gap-2 border-b pb-4">
      {post.title ? (
        <h1 className="text-xl font-semibold tracking-tight text-balance">
          {post.title}
        </h1>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <PostStatusBadge status={post.status} />
        <span className="text-xs text-muted-foreground">
          Created {formatFullDate(post.createdAt)}
        </span>
      </div>
    </div>
  );
}
