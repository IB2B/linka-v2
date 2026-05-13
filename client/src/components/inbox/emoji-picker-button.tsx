"use client";

import { useState, useRef, useEffect } from "react";
import { Smile } from "lucide-react";
import dynamic from "next/dynamic";
import data from "@emoji-mart/data";

const Picker = dynamic(() => import("@emoji-mart/react"), { ssr: false });

type Props = { onSelect: (emoji: string) => void };

export function EmojiPickerButton({ onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Emoji"
      >
        <Smile className="size-4" />
      </button>
      {open && (
        <div className="absolute bottom-10 left-0 z-50">
          <Picker
            data={data}
            onEmojiSelect={(e: any) => { onSelect(e.native); setOpen(false); }}
            theme="auto"
            previewPosition="none"
            skinTonePosition="none"
          />
        </div>
      )}
    </div>
  );
}
