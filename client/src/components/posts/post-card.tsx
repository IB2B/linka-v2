import { Calendar } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostActions } from "./post-actions";
import { PostStatusBadge } from "./post-status-badge";
import { PostImage } from "./post-image";
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
    post.content.slice(0, 220) + (post.content.length > 220 ? "…" : "");
  return (
    <Card className="group flex flex-col overflow-hidden p-0 transition-shadow hover:shadow-md">
      {post.imageStatus !== "skipped" ? (
        <div className="h-40 w-full">
          <PostImage url={post.imageUrl} status={post.imageStatus} />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <PostStatusBadge status={post.status} />
          {post.platform ? (
            <Badge variant="outline" className="capitalize">
              {post.platform}
            </Badge>
          ) : null}
          <span className="ml-auto text-muted-foreground">
            {formatPostDate(post.createdAt)}
          </span>
        </div>
        {post.scheduledFor ? (
          <p className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400">
            <Calendar className="size-3.5" />
            Goes out {formatScheduled(post.scheduledFor)}
          </p>
        ) : null}
        <p className="line-clamp-4 flex-1 text-sm leading-relaxed whitespace-pre-wrap text-foreground/85">
          {preview}
        </p>
        <div className="-mx-1 mt-auto border-t pt-3">
          <PostActions post={post} />
        </div>
      </div>
    </Card>
  );
}
