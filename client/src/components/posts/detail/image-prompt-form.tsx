"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useRegen } from "./regen-context";

type Props = { initialPrompt: string; hasImage: boolean; onClose: () => void };

export function ImagePromptForm({ initialPrompt, hasImage, onClose }: Props) {
  const { imagePending, runImage } = useRegen();
  const [value, setValue] = useState(initialPrompt);
  const trimmed = value.trim();

  function onGenerate() {
    runImage(trimmed || undefined);
    onClose();
  }

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-muted-foreground">Image prompt</h2>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        autoFocus
        disabled={imagePending}
        placeholder="Describe the image you want to generate…"
        className="scrollbar-thin resize-none leading-relaxed"
      />
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={onClose} disabled={imagePending}>
          Cancel
        </Button>
        <Button size="sm" onClick={onGenerate} disabled={imagePending || !trimmed}>
          {imagePending ? <Spinner aria-hidden /> : <ImageIcon className="size-4" />}
          {hasImage ? "Regenerate image" : "Generate image"}
        </Button>
      </div>
    </div>
  );
}
