import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { scoreTone } from "@/lib/posts/score-tone";

// Compact virality-score pill for the post card (only shown once a post is scored).
export function PostScoreBadge({ score }: { score: number }) {
  const t = scoreTone(score);
  return (
    <span
      title={`Virality score: ${score} (${t.label})`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
        t.badge,
      )}
    >
      <Sparkles className="size-3" />
      {score}
    </span>
  );
}
