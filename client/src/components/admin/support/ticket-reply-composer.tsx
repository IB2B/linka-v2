"use client";

import { useState, useTransition } from "react";
import { Send, Shield } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { AttachmentInput } from "@/components/support/attachment-input";
import { EmojiPicker } from "@/components/emoji-picker";
import { replyToTicketAction } from "@/app/admin/support/actions";

export function TicketReplyComposer({ id }: { id: string }) {
  const [text, setText] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const trimmed = text.trim();
  const canSend = (trimmed.length > 0 || !!attachmentUrl) && !pending;

  function send() {
    if (!canSend) return;
    start(async () => {
      const r = await replyToTicketAction(id, trimmed || "(attachment)", attachmentUrl ?? undefined);
      if ("error" in r) toast.error(r.error);
      else { setText(""); setAttachmentUrl(null); toast.success("Reply sent"); }
    });
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault(); send();
    }
  }

  return (
    <div className="border-t bg-background">
      <div className="flex items-center justify-between gap-3 px-4 py-2 text-xs tracking-tight text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Shield className="size-3" />
          Replying as Staff
        </span>
        <span className="tabular-nums">Ctrl/⌘ + Enter to send</span>
      </div>
      <div className="px-4 pb-4">
        <div className="rounded-xl border bg-background ring-1 ring-transparent transition focus-within:ring-ring">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKey}
            placeholder="Write a reply to the user…"
            rows={3}
            className="min-h-24 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center justify-between gap-2 border-t px-2.5 py-2">
            <div className="flex items-center gap-1">
              <EmojiPicker onPick={(e) => setText((t) => t + e)} />
              <AttachmentInput value={attachmentUrl} onChange={setAttachmentUrl} disabled={pending} />
            </div>
            <Button onClick={send} disabled={!canSend} size="sm">
              {pending ? <Spinner aria-hidden /> : <Send className="size-3.5" />}
              Send reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
