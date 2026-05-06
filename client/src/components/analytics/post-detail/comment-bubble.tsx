import type { ReactNode } from "react";

import { CommentMeta } from "./comment-meta";
import type { PostComment } from "@/lib/analytics/post-comments.types";

type Props = { comment: PostComment; hidden: boolean; right?: ReactNode };

export function CommentBubble({ comment, hidden, right }: Props) {
  return (
    <div className="rounded-2xl bg-zinc-50 px-3 py-2">
      <CommentMeta comment={comment} right={right} />
      {hidden ? (
        <p className="mt-1 text-sm italic text-muted-foreground">This comment is hidden.</p>
      ) : (
        <p className="mt-0.5 whitespace-pre-wrap break-words text-[14px] leading-snug text-foreground">
          {comment.text}
        </p>
      )}
    </div>
  );
}
