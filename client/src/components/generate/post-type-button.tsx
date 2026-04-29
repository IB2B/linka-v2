"use client";

import { cn } from "@/lib/utils";
import type { PostTypeMeta } from "@/lib/content/post-types";

type Props = {
  meta: PostTypeMeta;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
};

export function PostTypeButton({ meta, selected, disabled, onClick }: Props) {
  const Icon = meta.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-selected={selected}
      className={cn(
        "group flex flex-col gap-2 rounded-lg border p-3 text-left transition-colors",
        "hover:border-primary/50 hover:bg-muted/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[selected=true]:border-primary data-[selected=true]:bg-primary/5",
      )}
    >
      <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-data-[selected=true]:bg-primary group-data-[selected=true]:text-primary-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{meta.label}</p>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {meta.description}
        </p>
      </div>
    </button>
  );
}
