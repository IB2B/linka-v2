"use client";

import { Heart, Lightbulb, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FeedbackCategory } from "@/app/dashboard/feedback-action";

const OPTIONS: { value: FeedbackCategory; label: string; icon: LucideIcon }[] = [
  { value: "general", label: "Love letter", icon: Heart },
  { value: "feature", label: "Feature idea", icon: Lightbulb },
];

type Props = {
  value: FeedbackCategory;
  onChange: (v: FeedbackCategory) => void;
  disabled?: boolean;
};

export function FeedbackCategories({ value, onChange, disabled }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {OPTIONS.map(({ value: v, label, icon: Icon }) => {
        const active = v === value;
        return (
          <button
            key={v}
            type="button"
            disabled={disabled}
            onClick={() => onChange(v)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-50",
              active
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:bg-muted/50 hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
