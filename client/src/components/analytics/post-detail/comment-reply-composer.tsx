"use client";

import { useRef } from "react";

import { CommentAvatarCore } from "./comment-avatar-core";
import { CommentReplyToolbar } from "./comment-reply-toolbar";
import { CommentReplyImagePreview } from "./comment-reply-image-preview";
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
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mt-2 flex items-start gap-2">
      {me && <CommentAvatarCore name={me.name} src={me.avatar} size={32} className="mt-1" />}
      <div className="flex-1 rounded-2xl border border-zinc-200 bg-background px-3 py-2 focus-within:border-zinc-400">
        {me && <div className="text-[13px] font-semibold text-foreground">{me.name}</div>}
        <textarea
          ref={s.taRef} value={s.text} onChange={(e) => s.setText(e.target.value)}
          rows={2} placeholder="Write a reply…"
          className="mt-1 w-full resize-none border-0 bg-transparent text-sm leading-5 placeholder:text-muted-foreground focus:outline-none"
        />
        {s.imageUrl && (
          <CommentReplyImagePreview url={s.imageUrl} onRemove={() => s.setImageUrl(null)} />
        )}
        <input
          ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]; e.target.value = "";
            if (f) s.onFile(f);
          }}
        />
        <CommentReplyToolbar
          canSend={s.trimmed.length > 0} pending={s.pending}
          suggesting={s.suggesting} imageUploading={s.uploading}
          onEmoji={s.insertEmoji} onImageClick={() => fileRef.current?.click()}
          onSuggest={s.suggest} onSend={s.send}
        />
      </div>
    </div>
  );
}
