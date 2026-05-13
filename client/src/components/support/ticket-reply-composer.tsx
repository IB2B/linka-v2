"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { AttachmentInput } from "@/components/support/attachment-input";
import { DropZone } from "@/components/support/drop-zone";
import { replyToMyTicketAction } from "@/app/dashboard/support/actions";
import { uploadSupportAttachment } from "@/lib/support/upload-attachment";

export function TicketReplyComposer({ id }: { id: string }) {
  const [text, setText] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [dragging, setDragging] = useState(false);
  const [autoUploading, setAutoUploading] = useState(false);
  const trimmed = text.trim();
  const canSend = (trimmed.length > 0 || !!attachmentUrl) && !pending;

  async function ingestFile(file: File) {
    if (!file.type.startsWith("image/")) { toast.error("Only images are supported."); return; }
    setAutoUploading(true);
    const r = await uploadSupportAttachment(file);
    setAutoUploading(false);
    if ("error" in r) toast.error(r.error);
    else setAttachmentUrl(r.url);
  }

  function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const file = Array.from(e.clipboardData.files).find((f) => f.type.startsWith("image/"));
    if (file) { e.preventDefault(); ingestFile(file); }
  }

  function send() {
    if (!canSend) return;
    start(async () => {
      const r = await replyToMyTicketAction(id, trimmed || "(attachment)", attachmentUrl ?? undefined);
      if ("error" in r) toast.error(r.error);
      else { setText(""); setAttachmentUrl(null); toast.success("Message sent"); }
    });
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); send(); }
  }

  return (
    <div className="border-t bg-background">
      <div className="px-4 py-2 text-xs tracking-tight text-muted-foreground">
        Reply to our support team · Ctrl/⌘ + Enter to send · drop or paste images
      </div>
      <div className="px-4 pb-4">
        <DropZone onDrop={ingestFile} dragging={dragging} onDraggingChange={setDragging}>
          <Textarea
            value={text} onChange={(e) => setText(e.target.value)}
            onKeyDown={onKey} onPaste={onPaste}
            placeholder={dragging ? "Drop image to attach…" : "Write a message…"}
            rows={3}
            className="min-h-24 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center justify-between gap-2 border-t px-2.5 py-2">
            <AttachmentInput value={attachmentUrl} onChange={setAttachmentUrl} disabled={pending || autoUploading} />
            <Button onClick={send} disabled={!canSend} size="sm">
              {pending ? <Spinner aria-hidden /> : <Send className="size-3.5" />}
              Send
            </Button>
          </div>
        </DropZone>
      </div>
    </div>
  );
}
