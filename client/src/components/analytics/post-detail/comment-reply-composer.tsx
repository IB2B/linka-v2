"use client";

import { CommentAvatarCore } from "./comment-avatar-core";
import { CommentReplyToolbar } from "./comment-reply-toolbar";
import { useReplyState } from "./use-reply-state";
import type { CommenterMe } from "@/lib/analytics/post-comments.types";

type Props = {
  postId: string;
  platform: string;
  commentId: string;
  commentMessage: string;
  commenterName?: string;
  me?: CommenterMe;
  onDone: () => void;
  onPosted: (text: string) => void;
};

export function CommentReplyComposer({
  postId, platform, commentId, commentMessage, commenterName, me, onDone, onPosted,
}: Props) {
  const s = useReplyState({
    postId, platform, commentId, commentMessage, commenterName, onDone, onPosted,
  });

  return (
    <div className="mt-2 flex items-start gap-2">
      {me && <CommentAvatarCore name={me.name} src={me.avatar} size={32} className="mt-1" />}
      <div className="flex-1 rounded-2xl border border-border bg-background px-3 py-2 focus-within:border-foreground/40">
        {me && <div className="text-[13px] font-semibold text-foreground">{me.name}</div>}
        <textarea
          ref={s.taRef} value={s.text} onChange={(e) => s.setText(e.target.value)}
          rows={2} placeholder="Write a reply…"
          className="mt-1 w-full resize-none border-0 bg-transparent text-sm leading-5 placeholder:text-muted-foreground focus:outline-none"
        />
        <CommentReplyToolbar
          canSend={s.trimmed.length > 0} pending={s.pending}
          suggesting={s.suggesting}
          onEmoji={s.insertEmoji}
          onSuggest={s.suggest} onSend={s.send}
        />
      </div>
    </div>
  );
}
