import { PostDetailMetaRow } from "./post-detail-meta-row";
import { formatFullDate } from "@/lib/posts/format-detail-date";
import type { GeneratedPost } from "@/types/post";

export function PostDetailMeta({ post }: { post: GeneratedPost }) {
  return (
    <dl className="space-y-4 rounded-lg border bg-muted/30 p-4">
      <PostDetailMetaRow label="Prompt">
        {post.prompt ? (
          <span>{post.prompt}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </PostDetailMetaRow>
      {post.imagePrompt ? (
        <PostDetailMetaRow label="Image prompt">
          <span className="text-muted-foreground">{post.imagePrompt}</span>
        </PostDetailMetaRow>
      ) : null}
      {post.scheduledFor ? (
        <PostDetailMetaRow label="Scheduled for">
          {formatFullDate(post.scheduledFor)}
        </PostDetailMetaRow>
      ) : null}
      {post.postedAt ? (
        <PostDetailMetaRow label="Posted at">
          {formatFullDate(post.postedAt)}
        </PostDetailMetaRow>
      ) : null}
      <PostDetailMetaRow label="Status">
        <span className="capitalize">{post.status}</span>
      </PostDetailMetaRow>
      <PostDetailMetaRow label="Image status">
        <span className="capitalize">{post.imageStatus}</span>
      </PostDetailMetaRow>
    </dl>
  );
}
