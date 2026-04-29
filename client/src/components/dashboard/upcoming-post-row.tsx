import { Calendar } from "lucide-react";
import type { GeneratedPost } from "@/types/post";

function formatScheduled(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit",
  }).format(new Date(iso));
}

export function UpcomingPostRow({ post }: { post: GeneratedPost }) {
  const preview = post.content.slice(0, 90).trim();
  return (
    <div className="flex items-start justify-between gap-3 border-b py-2.5 last:border-b-0">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="line-clamp-1 text-sm text-foreground/90">
          {preview || "Untitled post"}
        </p>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          {formatScheduled(post.scheduledFor!)}
        </span>
      </div>
      {post.platform ? (
        <span className="shrink-0 text-xs text-muted-foreground capitalize">
          {post.platform}
        </span>
      ) : null}
    </div>
  );
}
