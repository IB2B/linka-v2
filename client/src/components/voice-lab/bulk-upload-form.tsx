"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { FileImport } from "./file-import";
import { bulkCreateSamplesAction } from "@/app/dashboard/voice-lab/actions";

export function BulkUploadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [text, setText] = useState("");
  const [pending, start] = useTransition();

  function appendFile(content: string) {
    setText((prev) => (prev.trim() ? `${prev.trim()}\n---\n${content}` : content));
  }

  function onSubmit() {
    const chunks = text
      .split(/\n\s*---\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    const samples = chunks.map((content) => ({ content, source: "other" as const }));
    if (!samples.length) {
      toast.error("Paste at least one sample.");
      return;
    }
    start(async () => {
      const res = await bulkCreateSamplesAction(samples);
      if (res.error) toast.error(res.error);
      else {
        toast.success(`${samples.length} samples added.`);
        setText("");
        onSuccess?.();
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="bulk">
            Paste samples (separate with a line containing only ---)
          </Label>
          <FileImport multiple onContent={appendFile} />
        </div>
        <Textarea
          id="bulk"
          rows={12}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"First sample…\n---\nSecond sample…"}
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button onClick={onSubmit} disabled={pending}>
          {pending ? <Spinner aria-hidden /> : null}
          Add all
        </Button>
      </div>
    </div>
  );
}
