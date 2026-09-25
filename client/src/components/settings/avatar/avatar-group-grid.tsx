"use client";

import { cn } from "@/lib/utils";
import { PreviewThumb } from "./preview-thumb";
import type { AvatarGroup } from "@/types/avatar-settings";

type Props = {
  groups: AvatarGroup[];
  activeId: string | null;
  onOpen: (id: string) => void;
};

// A group is a person; its looks are that person in different outfits and rooms.
// Opening one loads its looks — a group id is never saved, it cannot render.
export function AvatarGroupGrid({ groups, activeId, onOpen }: Props) {
  if (groups.length === 0) return null;
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {groups.map((g) => (
        <button
          key={g.id}
          type="button"
          aria-pressed={g.id === activeId}
          onClick={() => onOpen(g.id)}
          className={cn(
            "overflow-hidden rounded-lg border text-left transition-colors",
            "hover:border-primary/50",
            g.id === activeId
              ? "border-primary ring-2 ring-primary/30"
              : "border-border",
          )}
        >
          <PreviewThumb src={g.previewImage} alt={g.name} className="aspect-square" />
          <div className="px-2 py-1.5">
            <p className="truncate text-xs font-medium">{g.name}</p>
            {g.failed ? (
              <p className="line-clamp-2 text-[10px] text-destructive" title={g.error ?? undefined}>
                Failed{g.error ? ` — ${g.error}` : ""}
              </p>
            ) : (
              <p className="text-[10px] text-muted-foreground">
                {g.trained ? `${g.looks} ${g.looks === 1 ? "look" : "looks"}` : "Building…"}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
