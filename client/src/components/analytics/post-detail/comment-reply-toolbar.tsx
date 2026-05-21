"use client";

import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { EmojiPicker } from "@/components/emoji-picker";

type Props = {
  canSend: boolean;
  pending: boolean;
  suggesting?: boolean;
  onEmoji: (e: string) => void;
  onSuggest?: () => void;
  onSend: () => void;
};

export function CommentReplyToolbar({
  canSend, pending, suggesting,
  onEmoji, onSuggest, onSend,
}: Props) {
  return (
    <div className="mt-1 flex items-center justify-between">
      <div className="flex items-center gap-0.5 text-muted-foreground">
        <EmojiPicker onPick={onEmoji} />
        {onSuggest && (
          <button
            type="button" aria-label="Suggest with AI"
            onClick={onSuggest} disabled={suggesting}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-medium hover:bg-muted hover:text-foreground disabled:opacity-50"
          >
            {suggesting
              ? <Spinner aria-hidden />
              : <Sparkles className="size-4 text-violet-500" />}
            <span className="hidden sm:inline">Suggest</span>
          </button>
        )}
      </div>
      <button
        type="button" onClick={onSend} disabled={pending || !canSend}
        className={cn(
          "inline-flex h-7 items-center gap-1 rounded-full px-3.5 text-xs font-semibold transition-colors",
          canSend
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-muted text-muted-foreground",
        )}
      >
        {pending && <Spinner aria-hidden />}
        Reply
      </button>
    </div>
  );
}
