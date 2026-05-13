"use client";

import { PlatformIcon } from "@/components/accounts/platform-icon";
import type { Platform } from "@/lib/zernio/zernio-account.types";
import { cn } from "@/lib/utils";

type Props = {
  platforms: string[];
  selected: string;
  onChange: (p: string) => void;
};

export function PlatformPicker({ platforms, selected, onChange }: Props) {
  if (platforms.length <= 1) return null;
  const options = ["all", ...platforms];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            selected === p
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground",
          )}
        >
          {p !== "all" && (
            <PlatformIcon platform={p as Platform} className="size-3.5" />
          )}
          <span className="capitalize">{p === "all" ? "All platforms" : p}</span>
        </button>
      ))}
    </div>
  );
}
