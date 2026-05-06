"use client";

import { Image as ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { EmojiPicker } from "./emoji-picker";

type Props = {
  canSend: boolean;
  pending: boolean;
  onEmoji: (e: string) => void;
  onSend: () => void;
};

export function CommentReplyToolbar({ canSend, pending, onEmoji, onSend }: Props) {
  return (
    <div className="mt-1 flex items-center justify-between">
      <div className="flex items-center gap-0.5 text-muted-foreground">
        <EmojiPicker onPick={onEmoji} />
        <button
          type="button" aria-label="Add image"
          className="rounded-md p-1.5 hover:bg-zinc-100 hover:text-foreground"
        >
          <ImageIcon className="size-4" />
        </button>
      </div>
      <button
        type="button" onClick={onSend} disabled={pending || !canSend}
        className={cn(
          "inline-flex h-7 items-center gap-1 rounded-full px-3.5 text-xs font-semibold transition-colors",
          canSend ? "bg-sky-600 text-white hover:bg-sky-700" : "bg-zinc-100 text-zinc-400",
        )}
      >
        {pending && <Spinner aria-hidden />}
        Reply
      </button>
    </div>
  );
}
