"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { INBOX_PLATFORMS } from "./platform-options";
import type { Platform } from "@/lib/zernio/zernio-account.types";

type Props = { active: string; connected: Platform[] };

export function PlatformFilter({ active, connected }: Props) {
  const options = INBOX_PLATFORMS.filter(
    (p) => p.value === "" || connected.includes(p.value as Platform),
  );
  if (options.length <= 1) return null;
  return (
    <div className="flex flex-wrap gap-1.5 px-3 pb-2">
      {options.map((p) => {
        const href = p.value
          ? `/dashboard/inbox?platform=${p.value}`
          : "/dashboard/inbox";
        const isActive = active === p.value;
        const activeStyle =
          isActive && p.color
            ? {
                backgroundColor: p.color,
                borderColor: p.color,
                color: "#fff",
                boxShadow: `0 4px 14px -4px ${p.color}80`,
              }
            : undefined;
        return (
          <Link
            key={p.value || "all"}
            href={href}
            style={activeStyle}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all",
              isActive && !p.color &&
                "border-foreground bg-foreground text-background shadow",
              !isActive &&
                "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:bg-accent hover:text-foreground",
            )}
          >
            {p.value && (
              <PlatformIcon
                platform={p.value as Platform}
                className="size-3"
                style={!isActive && p.color ? { color: p.color } : undefined}
              />
            )}
            {p.label}
          </Link>
        );
      })}
    </div>
  );
}
