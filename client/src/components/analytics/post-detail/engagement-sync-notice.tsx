import { Info } from "lucide-react";

import type { PostMetrics } from "@/types/analytics";

function isAllZero(m: PostMetrics): boolean {
  return m.impressions + m.reach + m.likes + m.shares + m.saves + m.clicks + m.views === 0;
}

export function EngagementSyncNotice({
  totals, platforms,
}: {
  totals: PostMetrics;
  platforms: string[];
}) {
  if (!isAllZero(totals)) return null;
  const list = platforms.length > 0
    ? platforms.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(", ")
    : "the platform";
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs text-muted-foreground">
      <Info className="mt-0.5 size-3.5 shrink-0 text-foreground/70" />
      <div className="space-y-1 leading-relaxed">
        <p className="font-medium text-foreground">
          Engagement is still syncing from {list}.
        </p>
        <p>
          Comments appear instantly because we fetch them live. Likes,
          impressions and reach are polled — they typically take 15 min to
          a few hours to show up, especially on Facebook.
        </p>
      </div>
    </div>
  );
}
