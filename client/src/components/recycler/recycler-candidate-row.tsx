"use client";

import { RecycleReasonBadge } from "./recycle-reason-badge";
import { RecycleRegenerateButton } from "./recycle-regenerate-button";
import type { RecycleCandidate } from "@/types/recycler";

function preview(s: string, n = 110): string {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

function ageLabel(days: number): string {
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.round(days / 7)}w ago`;
  return `${Math.round(days / 30)}mo ago`;
}

export function RecyclerCandidateRow({
  candidate,
}: { candidate: RecycleCandidate }) {
  const { post, reason, metrics, ageDays } = candidate;
  return (
    <tr className="border-t align-top transition-colors hover:bg-muted/40">
      <td className="px-3 py-2.5">
        <p className="line-clamp-2 max-w-md text-sm leading-snug">
          {preview(post.content)}
        </p>
      </td>
      <td className="px-3 py-2.5">
        <RecycleReasonBadge reason={reason} />
      </td>
      <td className="px-3 py-2.5 text-right text-sm tabular-nums text-muted-foreground">
        {metrics.likes.toLocaleString()}
      </td>
      <td className="px-3 py-2.5 text-right text-sm tabular-nums text-muted-foreground">
        {(metrics.engagementRate * 100).toFixed(1)}%
      </td>
      <td className="px-3 py-2.5 text-xs whitespace-nowrap text-muted-foreground">
        {ageLabel(ageDays)}
      </td>
      <td className="px-3 py-2.5 text-right">
        <RecycleRegenerateButton postId={post.id} />
      </td>
    </tr>
  );
}
