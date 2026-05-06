"use client";

import { cn } from "@/lib/utils";
import { PlatformBadge } from "@/components/inbox/platform-badge";

const LABELS: Record<string, string> = {
  linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook",
  twitter: "X", threads: "Threads", reddit: "Reddit",
};

type Pill = { value: string; label: string; count: number };

type Props = {
  pills: Pill[];
  active: string;
  onChange: (value: string) => void;
};

export function CommentsPlatformPills({ pills, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {pills.map((p) => {
        const isActive = active === p.value;
        return (
          <button
            key={p.value} type="button" onClick={() => onChange(p.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors",
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {p.value !== "all" && (
              <PlatformBadge platform={p.value} className="size-3" />
            )}
            {LABELS[p.value] ?? p.label}
            <span className="opacity-70">({p.count})</span>
          </button>
        );
      })}
    </div>
  );
}
