"use client";

import { useState } from "react";
import { Pencil, Copy, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ImagePromptForm } from "./image-prompt-form";

type Props = { initialPrompt: string; hasImage: boolean };

export function ImagePromptEditor({ initialPrompt, hasImage }: Props) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const prompt = initialPrompt.trim();

  if (editing) {
    return (
      <ImagePromptForm
        initialPrompt={initialPrompt}
        hasImage={hasImage}
        onClose={() => setEditing(false)}
      />
    );
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy.");
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">Image prompt</h2>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
            <Pencil className="size-3.5" />
            Edit
          </Button>
          {prompt ? (
            <Button size="sm" variant="ghost" onClick={onCopy}>
              {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
              Copy
            </Button>
          ) : null}
        </div>
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {prompt || "No image prompt yet — click Edit to write one and generate an image."}
      </p>
    </div>
  );
}
