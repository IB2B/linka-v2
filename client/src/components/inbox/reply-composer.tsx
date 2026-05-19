"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { EmojiPickerButton } from "./emoji-picker-button";
import { AttachmentButton } from "./attachment-button";
import { AttachmentPreview } from "./attachment-preview";
import { AiSuggestBar } from "./ai-suggest-bar";
import { SuggestionPills } from "./suggestion-pills";
import { sendReplyAction, assistReplyAction, uploadAttachmentAction } from "@/app/dashboard/inbox/actions";
import type { AssistResult } from "@/lib/inbox/assist.types";

type Props = { conversationId: string; accountId: string | null };
export function ReplyComposer({ conversationId, accountId }: Props) {
  const t = useTranslations("inbox.composer");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [assist, setAssist] = useState<AssistResult | null>(null);
  const [pending, start] = useTransition();
  const [aiPending, startAi] = useTransition();

  function send() {
    if (!text.trim() && !file) return;
    start(async () => {
      let mediaUrl: string | undefined;
      if (file) {
        const fd = new FormData(); fd.append("file", file);
        const up = await uploadAttachmentAction(fd);
        if ("error" in up) { toast.error(up.error); return; }
        mediaUrl = up.url;
      }
      const r = await sendReplyAction(conversationId, text, accountId, mediaUrl);
      if ("error" in r) toast.error(r.error);
      else { setText(""); setFile(null); setAssist(null); toast.success(t("sent")); }
    });
  }

  function suggest() {
    if (text.trim() && !confirm(t("confirmReplace"))) return;
    startAi(async () => {
      const r = await assistReplyAction(conversationId, accountId);
      if ("error" in r) { toast.error(r.error); return; }
      setAssist(r.data);
      if (r.data.intent === "spam") { toast.info(t("spamFlagged")); return; }
      if (r.data.replies[0]) setText(r.data.replies[0].text);
    });
  }

  const canSend = (!!text.trim() || !!file) && !pending;

  return (
    <div className="border-t bg-background p-3 space-y-2">
      <AiSuggestBar onSuggest={suggest} pending={aiPending} disabled={pending} assist={assist} />
      {assist && <SuggestionPills replies={assist.replies} onSelect={setText} />}
      {file && <AttachmentPreview file={file} onRemove={() => setFile(null)} />}
      <div className="flex items-end gap-1.5">
        <EmojiPickerButton onSelect={(e) => setText((tx) => tx + e)} />
        <AttachmentButton onFile={setFile} />
        <Textarea
          value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={t("placeholder")}
          rows={1} className="max-h-32 min-h-9 resize-none"
        />
        <Button type="button" onClick={send} disabled={!canSend} size="lg" className="self-stretch">
          {pending ? <Spinner aria-hidden /> : <Send aria-hidden className="size-4" />}
          {t("send")}
        </Button>
      </div>
    </div>
  );
}
