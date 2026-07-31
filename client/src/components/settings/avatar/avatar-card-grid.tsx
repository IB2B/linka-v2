"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { PreviewThumb } from "./preview-thumb";
import type { AvatarOption } from "@/types/avatar-settings";

// One grid for both the user's own looks and the stock catalogue — the card is
// identical, so it lives here once.
type Props = {
  options: AvatarOption[];
  selectedId: string | null;
  onSelect: (option: AvatarOption) => void;
};

export function AvatarCardGrid({ options, selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {options.map((o) => {
        const selected = o.id === selectedId;
        const disabled = o.ready === false;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => onSelect(o)}
            className={cn(
              "relative overflow-hidden rounded-lg border text-left transition-colors",
              "hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-40",
              selected ? "border-primary ring-2 ring-primary/30" : "border-border",
            )}
          >
            <PreviewThumb src={o.previewImage} alt={o.name} className="aspect-[3/4]" />
            {selected ? (
              <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" />
              </span>
            ) : null}
            <p className="truncate px-2 py-1.5 text-xs font-medium">{o.name}</p>
            {disabled ? (
              <p className="px-2 pb-1.5 text-[10px] text-muted-foreground">
                Still training
              </p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
