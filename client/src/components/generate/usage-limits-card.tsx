import Link from "next/link";

import { UsageLimitRow } from "./usage-limit-row";
import type { UsageSummary } from "@/types/usage";

const resetFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

type Props = { usage: UsageSummary; platformCount: number };

// Tells the user, before they spend anything, what this generation costs and
// what they have left — including that regenerating text is free.
export function UsageLimitsCard({ usage, platformCount }: Props) {
  const { posts, images, videos } = usage;
  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <p className="text-sm font-semibold">Your limits</p>
      <UsageLimitRow label="Posts this month" used={posts.used} limit={posts.limit}
        note={<>This will use <strong>{platformCount}</strong> post{platformCount === 1 ? "" : "s"} — one per platform. Resets {resetFmt.format(new Date(posts.resetsAt))}.</>} />
      <UsageLimitRow label="Images today" used={images.used} limit={images.limit} />
      {videos.allowed ? (
        <UsageLimitRow label="Videos this month" used={videos.used} limit={videos.limit} />
      ) : (
        <p className="text-sm">
          <span className="font-medium">Videos</span>
          <span className="text-muted-foreground"> — included from the Creator plan. </span>
          <Link href="/dashboard/billing" className="font-medium text-primary hover:underline">Upgrade</Link>
        </p>
      )}
      <p className="border-t pt-3 text-xs text-muted-foreground">
        Regenerating a post&apos;s text is free and doesn&apos;t count as a post.
        Regenerating an image counts toward today&apos;s limit; re-rendering a
        video uses one of this month&apos;s videos. Failed videos don&apos;t count.
      </p>
    </div>
  );
}
