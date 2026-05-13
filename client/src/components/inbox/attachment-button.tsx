"use client";

import { useRef } from "react";
import { Paperclip } from "lucide-react";

type Props = { onFile: (file: File) => void };

export function AttachmentButton({ onFile }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*,video/*,.pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Attach file"
      >
        <Paperclip className="size-4" />
      </button>
    </>
  );
}
