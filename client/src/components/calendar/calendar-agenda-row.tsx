import Link from "next/link";

import { PostStatusBadge } from "@/components/posts/post-status-badge";
import { platformColorVar } from "@/lib/calendar/platform-color";
import { timeLabel } from "@/lib/calendar/format";
import { postDate } from "@/lib/calendar/group-posts";
import type { GeneratedPost } from "@/types/post";

export function CalendarAgendaRow({ post }: { post: GeneratedPost }) {
  return (
    <Link
      href={`/dashboard/posts/${post.id}`}
      style={{ borderLeftColor: platformColorVar(post.platform) }}
      className="flex items-start gap-4 rounded-md border border-l-4 bg-background px-4 py-3 transition hover:bg-muted/50"
    >
      <span className="w-16 shrink-0 pt-0.5 text-sm font-semibold tabular-nums">
        {timeLabel(postDate(post).toISOString())}
      </span>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="line-clamp-2 text-sm">{post.content || "Untitled"}</p>
        <p className="text-xs capitalize text-muted-foreground">
          {post.platform ?? "No platform"}
        </p>
      </div>
      <PostStatusBadge status={post.status} />
    </Link>
  );
}
