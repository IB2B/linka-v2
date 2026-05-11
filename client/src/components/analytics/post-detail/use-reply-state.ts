"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { replyToComment } from "@/lib/analytics/reply-comment";
import { suggestReply as fetchSuggestion } from "@/lib/analytics/suggest-reply";
import { uploadCommentImage } from "@/lib/analytics/upload-comment-image";

type Args = {
  postId: string;
  platform: string;
  commentId: string;
  commentMessage: string;
  commenterName?: string;
  onPosted: (text: string) => void;
  onDone: () => void;
};

export function useReplyState(a: Args) {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
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

  async function suggest() {
    setSuggesting(true);
    const r = await fetchSuggestion({
      postId: a.postId, platform: a.platform,
      commentMessage: a.commentMessage, commenterName: a.commenterName,
    });
    setSuggesting(false);
    if (!r.ok) { toast.error(r.error); return; }
    setText(r.suggestion);
    requestAnimationFrame(() => taRef.current?.focus());
  }

  async function onFile(file: File) {
    setUploading(true);
    const r = await uploadCommentImage(a.postId, file);
    setUploading(false);
    if (!r.ok) { toast.error(r.error); return; }
    setImageUrl(r.url);
  }

  function send() {
    if (!trimmed) return;
    start(async () => {
      const r = await replyToComment({
        postId: a.postId, platform: a.platform, commentId: a.commentId,
        message: trimmed, imageUrl: imageUrl ?? undefined,
      });
      if (!r.ok) { toast.error(r.error); return; }
      toast.success("Reply sent");
      a.onPosted(trimmed);
      setText(""); setImageUrl(null);
      a.onDone();
    });
  }

  return {
    text, setText, trimmed, taRef,
    imageUrl, setImageUrl, uploading, onFile,
    suggesting, suggest, pending, send, insertEmoji,
  };
}
