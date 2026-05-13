"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/forms/form-field";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTicketAction } from "@/app/dashboard/support/actions";
import { SupportSelectFields } from "./support-select-fields";
import { CharacterCounter } from "./character-counter";
import { AttachmentInput } from "./attachment-input";
import type { TicketCategory, TicketPriority } from "@/lib/support/support.types";

const BODY_MIN = 10; const BODY_MAX = 5000;

export function SupportForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [pending, start] = useTransition();
  const [category, setCategory] = useState<TicketCategory>("bug");
  const [priority, setPriority] = useState<TicketPriority>("normal");
  const [body, setBody] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    const subject = String(formData.get("subject") ?? "").trim();
    const trimmed = body.trim();
    if (subject.length < 3) { toast.error("Subject is too short."); return; }
    if (trimmed.length < BODY_MIN) { toast.error(`Please describe the issue (${BODY_MIN}+ chars).`); return; }
    start(async () => {
      const r = await createTicketAction({ subject, body: trimmed, category, priority, attachmentUrl: attachmentUrl ?? undefined });
      if ("error" in r) toast.error(r.error);
      else { toast.success("Ticket submitted — we'll be in touch shortly."); setBody(""); setAttachmentUrl(null); onSuccess?.(); }
    });
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <FormField id="subject" name="subject" label="Subject" placeholder="Brief summary of the issue" required />
      <SupportSelectFields category={category} priority={priority} onCategoryChange={setCategory} onPriorityChange={setPriority} />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="body">Describe the problem</Label>
          <CharacterCounter value={body.length} min={BODY_MIN} max={BODY_MAX} />
        </div>
        <Textarea id="body" name="body" rows={6} maxLength={BODY_MAX} value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What were you doing? What did you expect? What happened?" />
      </div>
      <div className="space-y-2">
        <Label>Screenshot (optional)</Label>
        <AttachmentInput value={attachmentUrl} onChange={setAttachmentUrl} disabled={pending} />
      </div>
      <FormSubmitButton label="Submit ticket" pending={pending} />
    </form>
  );
}
