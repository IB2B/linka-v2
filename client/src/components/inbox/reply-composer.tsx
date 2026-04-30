"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { sendReplyAction } from "@/app/dashboard/inbox/actions";

export function ReplyComposer({ conversationId }: { conversationId: string }) {
  const [text, setText] = useState("");
  const [pending, start] = useTransition();

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    start(async () => {
      const r = await sendReplyAction(conversationId, trimmed);
      if ("error" in r) toast.error(r.error);
      else { setText(""); toast.success("Sent"); }
    });
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <div className="border-t bg-background p-3">
      <div className="flex items-end gap-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKey}
          placeholder="Type a reply… (Enter to send, Shift+Enter for newline)"
          rows={1}
          className="max-h-32 min-h-9 resize-none"
        />
        <Button type="button" onClick={send} disabled={pending || !text.trim()} size="icon">
          {pending ? <Spinner aria-hidden /> : <Send aria-hidden className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
