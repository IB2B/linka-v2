import { TierLegendDot } from "@/components/admin/subscriptions/tier-mix-bar";
import { formatMoney } from "@/lib/admin/format-money";
import type { SubsByTier } from "@/types/admin-subscription";

const fmt = new Intl.NumberFormat("en-US");

const LABEL: Record<string, string> = {
  free: "Free", starter: "Starter", pro: "Pro", scale: "Scale",
};

export function TierLegend({ tiers, totalMrr }: { tiers: SubsByTier[]; totalMrr: number }) {
  if (tiers.length === 0) return null;
  return (
    <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
      {tiers.map((t) => {
        const pct = totalMrr > 0 ? (t.mrr / totalMrr) * 100 : 0;
        return (
          <div key={t.tier} className="flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <TierLegendDot tier={t.tier} />
              <span className="font-medium tracking-tight">{LABEL[t.tier] ?? t.tier}</span>
              <span className="text-xs tracking-tight text-muted-foreground">
                {fmt.format(t.count)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium tabular-nums tracking-tight">
                {formatMoney(t.mrr, t.currency)}
              </span>
              {totalMrr > 0 ? (
                <span className="ml-2 text-[11px] tabular-nums tracking-tight text-muted-foreground">
                  {pct.toFixed(0)}%
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
