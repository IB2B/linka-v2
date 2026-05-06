import { Heart, Sparkles, Clock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { RecycleReasonBadge } from "./recycle-reason-badge";
import { RecycleStatChip } from "./recycle-stat-chip";
import { RecycleRegenerateButton } from "./recycle-regenerate-button";
import { ageLabel } from "./recycle-age";
import type { RecycleCandidate } from "@/types/recycler";

export function RecyclerCard({ candidate }: { candidate: RecycleCandidate }) {
  const { post, reason, metrics, ageDays } = candidate;
  return (
    <Card className="flex w-72 shrink-0 flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <RecycleReasonBadge reason={reason} />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
          {post.platform ?? "post"}
        </span>
      </div>
      <p className="line-clamp-5 text-sm leading-snug whitespace-pre-wrap text-foreground/90">
        {post.content}
      </p>
      <div className="flex flex-wrap gap-1.5">
        <RecycleStatChip
          icon={Heart} label="likes"
          value={metrics.likes.toLocaleString()}
        />
        <RecycleStatChip
          icon={Sparkles} label="eng"
          value={`${(metrics.engagementRate * 100).toFixed(1)}%`}
        />
        <RecycleStatChip
          icon={Clock} label="" value={ageLabel(ageDays)}
        />
      </div>
      <div className="mt-auto pt-1">
        <RecycleRegenerateButton postId={post.id} />
      </div>
    </Card>
  );
}
