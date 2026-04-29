"use client";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
};

export function ScheduleTimeButton({ label, selected, disabled, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm transition-colors",
        disabled && "cursor-not-allowed opacity-40",
        !disabled && !selected && "hover:bg-muted",
        selected && "border-foreground bg-foreground text-background",
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          selected ? "bg-background" : "bg-emerald-500",
        )}
      />
      <span className="font-medium tabular-nums">{label}</span>
    </button>
  );
}
