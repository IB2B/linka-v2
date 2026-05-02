"use client";

import { useState, useTransition } from "react";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { sendReplyAction, assistReplyAction } from "@/app/dashboard/inbox/actions";
import { IntentBadge } from "./intent-badge";
import type { AssistResult } from "@/lib/inbox/assist.types";

export function ReplyComposer({ conversationId }: { conversationId: string }) {
  const [text, setText] = useState("");
  const [assist, setAssist] = useState<AssistResult | null>(null);
  const [pending, start] = useTransition();
  const [aiPending, startAi] = useTransition();

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    start(async () => {
      const r = await sendReplyAction(conversationId, trimmed);
      if ("error" in r) toast.error(r.error);
      else { setText(""); setAssist(null); toast.success("Sent"); }
    });
  }

  function suggest() {
    startAi(async () => {
      const r = await assistReplyAction(conversationId);
      if ("error" in r) { toast.error(r.error); return; }
      setAssist(r.data);
      if (r.data.intent === "spam") {
        toast.info("Looks like spam — flagged, no draft.");
        return;
      }
      setText(r.data.reply);
    });
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <div className="border-t bg-background p-3">
      <div className="mb-2 flex items-center gap-2">
        <Button
          type="button" size="sm" variant="outline"
          onClick={suggest} disabled={aiPending || pending}
        >
          {aiPending ? <Spinner aria-hidden /> : <Sparkles className="size-3.5" />}
          AI suggest
        </Button>
        {assist ? (
          <IntentBadge intent={assist.intent} confidence={assist.confidence} />
        ) : null}
      </div>
      <div className="flex items-end gap-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKey}
          placeholder="Type a reply… (Enter to send, Shift+Enter for newline)"
          rows={1}
          className="max-h-32 min-h-9 resize-none"
        />
        <Button type="button" onClick={send} disabled={pending || !text.trim()} size="lg" className="self-stretch">
          {pending ? <Spinner aria-hidden /> : <Send aria-hidden className="size-4" />}
          Send
        </Button>
      </div>
    </div>
  );
}
