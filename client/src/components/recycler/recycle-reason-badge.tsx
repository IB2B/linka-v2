import { Trophy, TrendingDown } from "lucide-react";
import type { RecycleReason } from "@/types/recycler";

const META: Record<RecycleReason, { label: string; classes: string }> = {
  winner: {
    label: "Winner",
    classes: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
  },
  underdog: {
    label: "Underdog",
    classes: "border-amber-500/30 bg-amber-500/10 text-amber-700",
  },
};

export function RecycleReasonBadge({ reason }: { reason: RecycleReason }) {
  const m = META[reason];
  const Icon = reason === "winner" ? Trophy : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${m.classes}`}>
      <Icon className="size-3" />
      {m.label}
    </span>
  );
}
