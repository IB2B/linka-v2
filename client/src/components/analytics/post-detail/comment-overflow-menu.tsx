"use client";

import { useTransition } from "react";
import { MoreHorizontal, EyeOff, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { hideComment, deleteComment } from "@/lib/analytics/comment-actions";
import type { PostComment } from "@/lib/analytics/post-comments.types";

type Props = {
  postId: string;
  platform: string;
  comment: PostComment;
  onHidden: () => void;
  onDeleted: () => void;
};

export function CommentOverflowMenu({
  postId, platform, comment, onHidden, onDeleted,
}: Props) {
  const [pending, start] = useTransition();
  if (!comment.canHide && !comment.canDelete) return null;

  function hide() {
    start(async () => {
      const r = await hideComment(postId, { platform, commentId: comment.id });
      if (!r.ok) toast.error(r.error);
      else { toast.success("Comment hidden"); onHidden(); }
    });
  }

  function remove() {
    if (!confirm("Delete this comment? This cannot be undone.")) return;
    start(async () => {
      const r = await deleteComment(postId, { platform, commentId: comment.id });
      if (!r.ok) toast.error(r.error);
      else { toast.success("Comment deleted"); onDeleted(); }
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="More actions" disabled={pending}
        className="inline-flex items-center rounded-md p-1 text-muted-foreground transition-colors hover:bg-zinc-100 hover:text-foreground disabled:opacity-50"
      >
        <MoreHorizontal className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {comment.canHide && (
          <DropdownMenuItem onClick={hide}>
            <EyeOff className="size-4" /> Hide
          </DropdownMenuItem>
        )}
        {comment.canDelete && (
          <DropdownMenuItem variant="destructive" onClick={remove}>
            <Trash2 className="size-4" /> Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
