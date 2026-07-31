"use client";

import { Check, Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import type { VoiceOption } from "@/types/avatar-settings";

type Props = {
  voices: VoiceOption[];
  selectedId: string | null;
  playingId: string | null;
  onSelect: (id: string) => void;
  onPreview: (voice: VoiceOption) => void;
};

export function VoiceCardGrid({
  voices, selectedId, playingId, onSelect, onPreview,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {voices.map((v) => {
        const selected = v.id === selectedId;
        return (
          <div
            key={v.id}
            className={cn(
              "flex items-center gap-2 rounded-lg border p-2.5 transition-colors",
              selected ? "border-primary bg-primary/5" : "border-border",
            )}
          >
            <button
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(v.id)}
              className="min-w-0 flex-1 text-left"
            >
              <p className="truncate text-sm font-medium">{v.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {[v.language, v.gender].filter(Boolean).join(" · ") || "—"}
              </p>
            </button>
            {v.previewAudio ? (
              <button
                type="button"
                onClick={() => onPreview(v)}
                aria-label={`Preview ${v.name}`}
                className="flex size-7 shrink-0 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {playingId === v.id
                  ? <Pause className="size-3.5" />
                  : <Play className="size-3.5" />}
              </button>
            ) : null}
            {selected ? <Check className="size-4 shrink-0 text-primary" /> : null}
          </div>
        );
      })}
    </div>
  );
}
