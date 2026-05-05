import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function DeltaChip({ pct }: { pct: number | null }) {
  if (pct === null) {
    return (
      <span className="text-xs text-muted-foreground">new</span>
    );
  }
  if (pct === 0) return null;
  const positive = pct > 0;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  const cls = positive ? "text-emerald-600" : "text-rose-600";
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${cls}`}>
      <Icon className="size-3" />
      {Math.abs(pct)}%
    </span>
  );
}
