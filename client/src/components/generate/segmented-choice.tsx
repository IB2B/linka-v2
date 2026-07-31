"use client";

import { cn } from "@/lib/utils";

// Generic single-select pill row. Both avatar controls (framing, length) use it,
// so the markup lives here once.
type Props<T extends string | number> = {
  label: string;
  value: T;
  choices: readonly { value: T; label: string }[];
  onChange: (next: T) => void;
  disabled?: boolean;
};

export function SegmentedChoice<T extends string | number>({
  label, value, choices, onChange, disabled,
}: Props<T>) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={label}>
      {choices.map((c) => (
        <button
          key={String(c.value)}
          type="button"
          role="radio"
          aria-checked={value === c.value}
          data-selected={value === c.value}
          disabled={disabled}
          onClick={() => onChange(c.value)}
          className={cn(
            "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
            "hover:border-primary/50 hover:bg-muted/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[selected=true]:border-primary data-[selected=true]:bg-primary/5",
            "data-[selected=true]:text-primary",
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
