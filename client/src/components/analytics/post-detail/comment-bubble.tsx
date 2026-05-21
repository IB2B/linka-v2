import type { ReactNode } from "react";

import { CommentMeta } from "./comment-meta";
import type { PostComment } from "@/lib/analytics/post-comments.types";

type Props = { comment: PostComment; right?: ReactNode };

export function CommentBubble({ comment, right }: Props) {
  return (
    <div className="rounded-2xl bg-muted/60 px-3 py-2">
      <CommentMeta comment={comment} right={right} />
      <p className="mt-0.5 whitespace-pre-wrap break-words text-[14px] leading-snug text-foreground">
        {comment.text}
      </p>
    </div>
  );
}
