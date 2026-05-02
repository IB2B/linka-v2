"use client";

import { useState, useTransition } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Spinner } from "@/components/ui/spinner";
import { scorePostAction } from "@/app/dashboard/posts/score-action";
import { ViralityMeter } from "./virality-meter";
import { RainbowScoreButton } from "./rainbow-score-button";
import type { PostScore } from "@/types/post-score";

export function PostViralityScore({ postId }: { postId: string }) {
  const [score, setScore] = useState<PostScore | null>(null);
  const [pending, start] = useTransition();

  function run() {
    start(async () => {
      const r = await scorePostAction(postId);
      if ("error" in r) toast.error(r.error);
      else setScore(r.data);
    });
  }

  return (
    <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Virality score</h2>
        <RainbowScoreButton onClick={run} disabled={pending}>
          {pending ? <Spinner aria-hidden /> : <Sparkles className="size-3.5" />}
          {score ? "Re-score" : "Score"}
        </RainbowScoreButton>
      </div>
      {score ? (
        <>
          <ViralityMeter score={score.score} />
          {score.reasons.length > 0 ? (
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Why</p>
              <ul className="space-y-1 text-xs text-foreground/80">
                {score.reasons.map((r, i) => (
                  <li key={i} className="leading-relaxed">• {r}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {score.suggestions.length > 0 ? (
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Try</p>
              <ul className="space-y-1 text-xs text-foreground/80">
                {score.suggestions.map((s, i) => (
                  <li key={i} className="leading-relaxed">→ {s}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-xs text-muted-foreground">
          Score this post for hook strength, specificity, CTA, and platform fit.
        </p>
      )}
    </div>
  );
}
