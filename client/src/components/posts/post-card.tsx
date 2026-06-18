import Link from "next/link";
import { CalendarClock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PostActions } from "./post-actions";
import { PostCardMedia } from "./post-card-media";
import { PostStatusBadge } from "./post-status-badge";
import { PostScoreBadge } from "./post-score-badge";
import { formatPostDate } from "@/lib/posts/format-date";
import type { Platform } from "@/lib/zernio/zernio-account.types";
import type { GeneratedPost } from "@/types/post";

const KNOWN_PLATFORMS: Platform[] = [
  "linkedin", "facebook", "instagram", "twitter", "threads",
  "tiktok", "pinterest", "bluesky", "reddit",
];

function formatScheduled(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  }).format(d);
}

export function PostCard({ post }: { post: GeneratedPost }) {
  const preview =
    post.content.slice(0, 200) + (post.content.length > 200 ? "…" : "");
  const platform =
    post.platform && (KNOWN_PLATFORMS as string[]).includes(post.platform)
      ? (post.platform as Platform)
      : null;
  return (
    <Card className="group/post flex flex-col overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-foreground/20">
      <Link
        href={`/dashboard/posts/${post.id}`}
        className="flex min-h-[140px] flex-1 flex-row"
      >
        <div className="relative w-32 shrink-0 sm:w-36">
          <PostCardMedia post={post} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-3.5 pt-3 pb-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <PostStatusBadge status={post.status} />
              {platform ? (
                <span className="inline-flex items-center gap-1 rounded-full border bg-background px-1.5 py-0.5 text-[10px] font-medium capitalize text-foreground/80">
                  <PlatformIcon platform={platform} className="size-3" />
                  {platform}
                </span>
              ) : null}
              {post.viralityScore != null ? (
                <PostScoreBadge score={post.viralityScore} />
              ) : null}
            </div>
            <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
              {formatPostDate(post.createdAt)}
            </span>
          </div>
          <p className="line-clamp-3 flex-1 text-[13px] leading-snug whitespace-pre-wrap text-foreground/90">
            {preview}
          </p>
          {post.scheduledFor ? (
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 px-2 py-0.5 text-[11px] text-amber-700">
              <CalendarClock className="size-3 shrink-0" />
              <span className="font-medium">
                {formatScheduled(post.scheduledFor)}
              </span>
            </div>
          ) : null}
        </div>
      </Link>
      <div className="border-t bg-muted/40 px-2.5 py-1.5">
        <PostActions post={post} />
      </div>
    </Card>
  );
}
