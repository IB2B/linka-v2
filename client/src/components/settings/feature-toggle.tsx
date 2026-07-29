"use client";

import { cn } from "@/lib/utils";

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  ariaLabel: string;
  // "success" reads as live/connected rather than as a brand accent.
  tone?: "primary" | "success";
};

const ON_CLASS = {
  primary: "bg-primary border-primary",
  success: "bg-emerald-500 border-emerald-500",
} as const;

export function FeatureToggle({
  checked, onChange, disabled, ariaLabel, tone = "primary",
}: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        checked ? ON_CLASS[tone] : "bg-muted border-border",
      )}
    >
      <span
        className={cn(
          "inline-block size-4 rounded-full bg-background shadow ring-0 transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}
