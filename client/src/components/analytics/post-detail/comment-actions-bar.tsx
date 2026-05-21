"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { likeComment } from "@/lib/analytics/comment-actions";
import type { PostComment } from "@/lib/analytics/post-comments.types";

type Props = {
  postId: string;
  platform: string;
  comment: PostComment;
  liked: boolean;
  likeCount: number;
  onLikeToggle: (next: boolean) => void;
  onToggleReply: () => void;
};

export function CommentActionsBar(p: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function like() {
    if (!p.comment.canLike) return;
    const next = !p.liked;
    p.onLikeToggle(next);
    start(async () => {
      const r = await likeComment(p.postId, {
        platform: p.platform, commentId: p.comment.id,
        cid: p.comment.cid ?? undefined,
      });
      if (!r.ok) { p.onLikeToggle(!next); toast.error(r.error); return; }
      router.refresh();
    });
  }

  return (
    <div className="mt-1.5 flex items-center gap-0.5 text-[13px]">
      {p.comment.canLike && (
        <button
          type="button" onClick={like} disabled={pending}
          aria-pressed={p.liked} aria-label="Like"
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-1.5 py-1 transition-colors disabled:opacity-60",
            p.liked
              ? "text-primary hover:bg-primary/10"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <ThumbsUp className={cn("size-3.5", p.liked && "fill-current")} />
          {p.likeCount > 0 && <span className="tabular-nums">{p.likeCount}</span>}
        </button>
      )}
      <button
        type="button" onClick={p.onToggleReply} aria-label="Reply"
        className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <MessageSquare className="size-3.5" />
        {p.comment.replyCount > 0 && (
          <span className="tabular-nums">{p.comment.replyCount}</span>
        )}
      </button>
    </div>
  );
}
