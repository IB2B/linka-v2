import { Flame } from "lucide-react";

function tone(score: number): string {
  if (score >= 75) return "bg-emerald-500/10 text-emerald-600";
  if (score >= 50) return "bg-amber-500/10 text-amber-600";
  return "bg-muted text-muted-foreground";
}

// Compact 0–100 score chip, tinted by value (hot → emerald, mid → amber).
export function ScoreBadge({ score, label = "Score" }: { score: number; label?: string }) {
  const v = Math.max(0, Math.min(100, Math.round(score)));
  return (
    <span
      title={`${label}: ${v}/100`}
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums ${tone(v)}`}
    >
      <Flame className="size-3" aria-hidden />
      {v}
    </span>
  );
}
