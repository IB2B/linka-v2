"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { SourceSelect } from "./source-select";
import { FileImport } from "./file-import";
import { createSampleAction } from "@/app/dashboard/voice-lab/actions";

export function SingleUploadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [pending, start] = useTransition();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  function onSubmit(formData: FormData) {
    start(async () => {
      const res = await createSampleAction(formData);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Sample added.");
        setContent("");
        setTitle("");
        onSuccess?.();
      }
    });
  }

  function onFile(text: string, name: string) {
    setContent(text);
    if (!title) setTitle(name.replace(/\.[^.]+$/, ""));
    toast.success(`Imported ${name}`);
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <FormField
        id="title"
        label="Title (optional)"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="LinkedIn — product launch"
      />
      <SourceSelect />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Content</Label>
          <FileImport onContent={onFile} />
        </div>
        <Textarea
          id="content"
          name="content"
          rows={8}
          required
          minLength={100}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste a piece of your writing or import a .txt / .md file…"
        />
        <p className="text-xs text-muted-foreground">{wordCount} words</p>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button type="submit" disabled={pending}>
          {pending ? <Spinner aria-hidden /> : null}
          Add sample
        </Button>
      </div>
    </form>
  );
}
