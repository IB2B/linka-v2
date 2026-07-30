import { PostDetailMetaRow } from "./post-detail-meta-row";
import { ImagePromptEditor } from "./image-prompt-editor";
import { formatFullDate } from "@/lib/posts/format-detail-date";
import type { GeneratedPost } from "@/types/post";

export function PostDetailMeta({ post }: { post: GeneratedPost }) {
  return (
    <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
      <ImagePromptEditor
        initialPrompt={post.imagePrompt ?? ""}
        hasImage={post.imageStatus === "completed"}
      />
      <dl className="space-y-4 border-t pt-4">
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
        {post.videoStatus !== "skipped" ? (
          <PostDetailMetaRow label="Video status">
            <span className="capitalize">{post.videoStatus}</span>
          </PostDetailMetaRow>
        ) : null}
      </dl>
    </div>
  );
}
