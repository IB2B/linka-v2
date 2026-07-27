"use client";

import { Ban, ImageIcon, UserRound, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MediaKind } from "@/types/content";

type Option = {
  value: MediaKind;
  label: string;
  hint: string;
  Icon: typeof Video;
  badge?: string;
};

const OPTIONS: Option[] = [
  { value: "none", label: "Text only", hint: "No media attached", Icon: Ban },
  { value: "image", label: "AI image", hint: "Generate a still", Icon: ImageIcon },
  { value: "video", label: "AI video", hint: "Generate a clip", Icon: Video },
  {
    value: "avatar", label: "Avatar video", hint: "A presenter says it to camera",
    Icon: UserRound, badge: "New",
  },
];

type Props = {
  value: MediaKind;
  onChange: (next: MediaKind) => void;
  disabled?: boolean;
};

export function MediaTypeSelect({ value, onChange, disabled }: Props) {
  return (
    <div
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
      role="radiogroup"
      aria-label="AI media"
    >
      {OPTIONS.map(({ value: v, label, hint, Icon, badge }) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          data-selected={value === v}
          disabled={disabled}
          onClick={() => onChange(v)}
          className={cn(
            "group relative flex flex-col gap-2 rounded-lg border p-3 text-left transition-colors",
            "hover:border-primary/50 hover:bg-muted/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[selected=true]:border-primary data-[selected=true]:bg-primary/5",
          )}
        >
          {badge ? (
            <span className="absolute right-2 top-2 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
              {badge}
            </span>
          ) : null}
          <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-data-[selected=true]:bg-primary group-data-[selected=true]:text-primary-foreground">
            <Icon className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{label}</p>
            <p className="line-clamp-2 text-xs text-muted-foreground">{hint}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
