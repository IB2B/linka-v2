import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

import { relativeTime } from "@/lib/analytics/relative-time";
import { VerifiedBadge } from "./verified-badge";
import type { PostComment } from "@/lib/analytics/post-comments.types";

type Props = { comment: PostComment; right?: ReactNode };

export function CommentMeta({ comment, right }: Props) {
  return (
    <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
      <span className="truncate font-semibold text-foreground">
        {comment.authorName}
      </span>
      {comment.isVerified && <VerifiedBadge />}
      {comment.isOwner && (
        <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[11px] font-medium text-zinc-600">
          Author
        </span>
      )}
      <div className="ml-auto flex items-center gap-1.5 text-xs">
        {comment.url && (
          <a
            href={comment.url} target="_blank" rel="noopener noreferrer"
            aria-label="Open on platform"
            className="rounded-md p-1 text-muted-foreground hover:bg-zinc-100 hover:text-foreground"
          >
            <ExternalLink className="size-3.5" />
          </a>
        )}
        <span className="tabular-nums">{relativeTime(comment.createdAt)}</span>
        {right}
      </div>
    </div>
  );
}
