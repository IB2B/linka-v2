"use client";

import { PLATFORMS } from "@/lib/zernio/platforms";
import { PlatformChip } from "./platform-chip";
import { usePostPlatforms } from "./platforms-context";

export function PlatformPicker() {
  const ctx = usePostPlatforms();
  if (!ctx) return null;
  const { connected, selected, toggle, loading } = ctx;

  if (loading) {
    return (
      <div className="h-8 w-full animate-pulse rounded-md bg-muted/40" aria-hidden />
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-card/40 p-3">
      <div className="text-xs font-medium text-muted-foreground">
        Post to
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PLATFORMS.map((p) => (
          <PlatformChip
            key={p.slug}
            platform={p.slug}
            label={p.label}
            connected={connected.includes(p.slug)}
            selected={selected.includes(p.slug)}
            onToggle={() => toggle(p.slug)}
          />
        ))}
      </div>
    </div>
  );
}
