"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { INBOX_PLATFORMS } from "./platform-options";

export function PlatformFilter({ active }: { active: string }) {
  return (
    <div className="flex flex-wrap gap-1.5 px-3 pb-2">
      {INBOX_PLATFORMS.map((p) => {
        const href = p.value ? `/dashboard/inbox?platform=${p.value}` : "/dashboard/inbox";
        const isActive = active === p.value;
        return (
          <Link
            key={p.value || "all"}
            href={href}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs transition-colors",
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:bg-accent",
            )}
          >
            {p.label}
          </Link>
        );
      })}
    </div>
  );
}
