import type { SubsByTier } from "@/types/admin-subscription";

const TIER_BG: Record<string, string> = {
  free: "bg-muted-foreground/40",
  starter: "bg-sky-500",
  pro: "bg-violet-500",
  scale: "bg-amber-500",
};

const TIER_DOT: Record<string, string> = {
  free: "bg-muted-foreground/60",
  starter: "bg-sky-500",
  pro: "bg-violet-500",
  scale: "bg-amber-500",
};

export function TierMixBar({ tiers, totalMrr }: { tiers: SubsByTier[]; totalMrr: number }) {
  const segments = totalMrr > 0
    ? tiers.filter((t) => t.mrr > 0)
    : tiers.filter((t) => t.count > 0);
  const totalCount = tiers.reduce((acc, t) => acc + t.count, 0);
  const denom = totalMrr > 0 ? totalMrr : Math.max(totalCount, 1);

  return (
    <div className="flex gap-0.5 h-2 overflow-hidden rounded-full bg-muted">
      {segments.map((t) => {
        const numerator = totalMrr > 0 ? t.mrr : t.count;
        const pct = (numerator / denom) * 100;
        return (
          <div
            key={t.tier}
            className={`${TIER_BG[t.tier] ?? "bg-foreground/40"} transition-all`}
            style={{ width: `${pct}%` }}
            title={`${t.tier}: ${pct.toFixed(0)}%`}
          />
        );
      })}
    </div>
  );
}

export function TierLegendDot({ tier }: { tier: string }) {
  return <span className={`size-2 rounded-full ${TIER_DOT[tier] ?? "bg-foreground/40"}`} />;
}
