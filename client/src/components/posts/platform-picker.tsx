"use client";

import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORMS } from "@/lib/zernio/platforms";
import { ConnectPlatformLink } from "./connect-platform-link";
import { usePostPlatforms } from "./platforms-context";

export function PlatformPicker() {
  const ctx = usePostPlatforms();
  if (!ctx) return null;
  const { connected, selected, toggle, loading } = ctx;

  if (loading) {
    return <div className="h-9 w-full animate-pulse rounded-md bg-muted/40" aria-hidden />;
  }

  const connectedPlatforms = PLATFORMS.filter((p) => connected.includes(p.slug));
  const unconnectedCount = PLATFORMS.length - connectedPlatforms.length;

  if (connectedPlatforms.length === 0) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border bg-card/40 px-3 py-2.5">
        <div className="text-xs text-muted-foreground">
          No accounts connected yet — connect one to post.
        </div>
        <ConnectPlatformLink count={unconnectedCount} />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {connectedPlatforms.map((p) => {
        const isOn = selected.includes(p.slug);
        return (
          <Button
            key={p.slug}
            type="button"
            size="sm"
            variant={isOn ? "default" : "outline"}
            onClick={() => toggle(p.slug)}
            aria-pressed={isOn}
            className="gap-1.5"
          >
            <PlatformIcon platform={p.slug} className="size-4" />
            {p.label}
          </Button>
        );
      })}
      <ConnectPlatformLink count={unconnectedCount} />
    </div>
  );
}
