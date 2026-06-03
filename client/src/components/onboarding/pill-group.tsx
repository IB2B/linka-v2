"use client";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export function PillGroup({ label, options, value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o === value ? "" : o)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              value === o
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
