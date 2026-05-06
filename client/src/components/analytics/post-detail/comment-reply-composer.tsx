"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { replyToComment } from "@/lib/analytics/reply-comment";
import { CommentAvatarCore } from "./comment-avatar-core";
import { CommentReplyToolbar } from "./comment-reply-toolbar";
import type { CommenterMe } from "@/lib/analytics/post-comments.types";

type Props = {
  postId: string;
  platform: string;
  commentId: string;
  me?: CommenterMe;
  onDone: () => void;
  onPosted: (text: string) => void;
};

export function CommentReplyComposer({ postId, platform, commentId, me, onDone, onPosted }: Props) {
  const [text, setText] = useState("");
  const [pending, start] = useTransition();
  const taRef = useRef<HTMLTextAreaElement>(null);
  const trimmed = text.trim();

  function insertEmoji(e: string) {
    const ta = taRef.current;
    const pos = ta?.selectionStart ?? text.length;
    const end = ta?.selectionEnd ?? text.length;
    setText(text.slice(0, pos) + e + text.slice(end));
    requestAnimationFrame(() => ta?.setSelectionRange(pos + e.length, pos + e.length));
  }

  function send() {
    if (!trimmed) return;
    start(async () => {
      const r = await replyToComment({ postId, platform, commentId, message: trimmed });
      if (!r.ok) { toast.error(r.error); return; }
      toast.success("Reply sent");
      onPosted(trimmed);
      setText("");
      onDone();
    });
  }

  return (
    <div className="mt-2 flex items-start gap-2">
      {me && <CommentAvatarCore name={me.name} src={me.avatar} size={32} className="mt-1" />}
      <div className="flex-1 rounded-2xl border border-zinc-200 bg-background px-3 py-2 focus-within:border-zinc-400">
        {me && <div className="text-[13px] font-semibold text-foreground">{me.name}</div>}
        <textarea
          ref={taRef} value={text} onChange={(e) => setText(e.target.value)}
          rows={2} placeholder="Write a reply…"
          className="mt-1 w-full resize-none border-0 bg-transparent text-sm leading-5 placeholder:text-muted-foreground focus:outline-none"
        />
        <CommentReplyToolbar
          canSend={trimmed.length > 0} pending={pending}
          onEmoji={insertEmoji} onSend={send}
        />
      </div>
    </div>
  );
}
