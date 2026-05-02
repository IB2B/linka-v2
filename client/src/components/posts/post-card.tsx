import { CalendarClock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { PostActions } from "./post-actions";
import { PostCardMedia } from "./post-card-media";
import { formatPostDate } from "@/lib/posts/format-date";
import type { GeneratedPost } from "@/types/post";

function formatScheduled(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  }).format(d);
}

export function PostCard({ post }: { post: GeneratedPost }) {
  const preview =
    post.content.slice(0, 160) + (post.content.length > 160 ? "…" : "");
  return (
    <Card className="group/post flex flex-col overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-foreground/20">
      <PostCardMedia post={post} />
      <div className="flex flex-1 flex-col gap-2 px-4 pt-3 pb-2.5">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
          {formatPostDate(post.createdAt)}
        </span>
        <p className="line-clamp-3 flex-1 text-[13px] leading-snug whitespace-pre-wrap text-foreground/90">
          {preview}
        </p>
        {post.scheduledFor ? (
          <div className="flex items-center gap-1.5 rounded border border-amber-500/25 bg-amber-500/5 px-2 py-1 text-[11px] text-amber-700">
            <CalendarClock className="size-3 shrink-0" />
            <span className="font-medium">
              {formatScheduled(post.scheduledFor)}
            </span>
          </div>
        ) : null}
      </div>
      <div className="border-t bg-muted/40 px-2.5 py-2">
        <PostActions post={post} />
      </div>
    </Card>
  );
}
