import { Card, CardContent } from "@/components/ui/card";
import { ScoreRing } from "./score-ring";

function tierLabel(score: number): string {
  if (score >= 75) return "Outstanding performance";
  if (score >= 50) return "Solid performance";
  if (score >= 25) return "Mixed performance";
  return "Quiet performance";
}

export function PerformanceScoreCard({
  score, percentile, sampleSize,
}: { score: number; percentile: number; sampleSize: number }) {
  const topPct = Math.max(100 - percentile, 1);
  const s = sampleSize === 1 ? "" : "s";
  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-6 py-6">
        <ScoreRing score={score} />
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{tierLabel(score)}</p>
          <p className="text-2xl font-semibold tracking-tight">
            Top {topPct}% of your posts
          </p>
          <p className="text-xs text-muted-foreground">
            Compared against {sampleSize} other measurable post{s}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
