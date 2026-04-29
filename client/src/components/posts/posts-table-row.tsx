import { PostActions } from "./post-actions";
import { PostStatusBadge } from "./post-status-badge";
import { formatPostDate } from "@/lib/posts/format-date";
import type { GeneratedPost } from "@/types/post";

function formatScheduled(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  }).format(new Date(iso));
}

export function PostsTableRow({ post }: { post: GeneratedPost }) {
  const preview = post.content.slice(0, 120) + (post.content.length > 120 ? "…" : "");
  return (
    <tr className="border-b transition-colors hover:bg-muted/40">
      <td className="px-3 py-2.5 align-top">
        <PostStatusBadge status={post.status} />
      </td>
      <td className="px-3 py-2.5 align-top">
        <p className="line-clamp-2 max-w-md text-sm leading-snug text-foreground/90">
          {preview}
        </p>
      </td>
      <td className="px-3 py-2.5 align-top text-xs text-muted-foreground capitalize">
        {post.platform ?? "—"}
      </td>
      <td className="px-3 py-2.5 align-top text-xs text-muted-foreground tabular-nums">
        {formatScheduled(post.scheduledFor)}
      </td>
      <td className="px-3 py-2.5 align-top text-xs text-muted-foreground tabular-nums">
        {formatPostDate(post.createdAt)}
      </td>
      <td className="px-3 py-2.5 align-top">
        <PostActions post={post} />
      </td>
    </tr>
  );
}
