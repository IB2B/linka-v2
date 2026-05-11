"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CommentAvatar } from "./comment-avatar";
import { CommentBubble } from "./comment-bubble";
import { CommentActionsBar } from "./comment-actions-bar";
import { CommentOverflowMenu } from "./comment-overflow-menu";
import { CommentReplyComposer } from "./comment-reply-composer";
import { CommentReplies } from "./comment-replies";
import { makeOptimisticReply } from "@/lib/analytics/make-optimistic-reply";
import type { CommenterMe, PostComment } from "@/lib/analytics/post-comments.types";

type Props = {
  postId: string;
  platform: string;
  comment: PostComment;
  me?: CommenterMe;
  depth?: number;
};

export function CommentRow({ postId, platform, comment, me, depth = 0 }: Props) {
  const router = useRouter();
  const [replyOpen, setReplyOpen] = useState(false);
  const [liked, setLiked] = useState(comment.isLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [hidden, setHidden] = useState(comment.isHidden);
  const [deleted, setDeleted] = useState(false);
  const [localReplies, setLocalReplies] = useState<PostComment[]>([]);

  useEffect(() => { setLocalReplies([]); }, [comment.replies]);
  useEffect(() => {
    setLiked(comment.isLiked); setLikeCount(comment.likeCount);
    setHidden(comment.isHidden);
  }, [comment.isLiked, comment.likeCount, comment.isHidden]);

  if (deleted) return null;

  function onReplyPosted(text: string) {
    setLocalReplies((r) => [...r, makeOptimisticReply(text, me)]);
    router.refresh();
  }

  return (
    <div className="flex gap-3 py-2.5">
      <CommentAvatar name={comment.authorName} src={comment.authorAvatar} platform={platform} />
      <div className="min-w-0 flex-1">
        <CommentBubble
          comment={comment} hidden={hidden}
          right={
            <CommentOverflowMenu
              postId={postId} platform={platform} comment={comment}
              onHidden={() => setHidden(true)} onDeleted={() => setDeleted(true)}
            />
          }
        />
        <CommentActionsBar
          postId={postId} platform={platform} comment={comment}
          liked={liked} likeCount={likeCount}
          onLikeToggle={(n) => { setLiked(n); setLikeCount((c) => c + (n ? 1 : -1)); }}
          onToggleReply={() => setReplyOpen((v) => !v)}
        />
        {replyOpen && (
          <CommentReplyComposer
            postId={postId} platform={platform} commentId={comment.id}
            commentMessage={comment.text} commenterName={comment.authorName} me={me}
            onDone={() => setReplyOpen(false)} onPosted={onReplyPosted}
          />
        )}
        <CommentReplies
          postId={postId} platform={platform} depth={depth} me={me}
          replies={[...comment.replies, ...localReplies]}
        />
      </div>
    </div>
  );
}
