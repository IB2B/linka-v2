import { CreditCard, TrendingUp, UserMinus, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { KpiPill } from "@/components/admin/subscriptions/kpi-pill";
import { TierMixBar } from "@/components/admin/subscriptions/tier-mix-bar";
import { TierLegend } from "@/components/admin/subscriptions/tier-legend";
import { formatMoney } from "@/lib/admin/format-money";
import type { AdminSubsSummary } from "@/types/admin-subscription";

const fmt = new Intl.NumberFormat("en-US");

export function FinancialOverview({ summary }: { summary: AdminSubsSummary }) {
  const cur = summary.currency ?? "usd";
  const total = summary.paying + summary.free + summary.trialing;
  const conv = total ? Math.round((summary.paying / total) * 100) : 0;
  return (
    <Card size="sm" className="gap-6 px-6 py-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Monthly recurring revenue
          </span>
          <span className="text-5xl font-semibold tabular-nums tracking-tight">
            {formatMoney(summary.mrr, cur)}
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm tracking-tight text-muted-foreground">
            <span><span className="tabular-nums">{formatMoney(summary.arr, cur)}</span> ARR</span>
            <span aria-hidden>·</span>
            <span><span className="tabular-nums">{conv}%</span> paid conversion</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 self-start sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <KpiPill label="Paying" value={fmt.format(summary.paying)} icon={CreditCard} tone="success" />
          <KpiPill label="Trialing" value={fmt.format(summary.trialing)} icon={TrendingUp} />
          <KpiPill label="Free" value={fmt.format(summary.free)} icon={Users} tone="muted" />
          <KpiPill label="Canceled 30d" value={fmt.format(summary.canceledLast30d)} icon={UserMinus} tone="warning" />
        </div>
      </div>
      <div className="space-y-3 border-t pt-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Revenue mix
          </span>
          <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
            {formatMoney(summary.mrr, cur)} total
          </span>
        </div>
        <TierMixBar tiers={summary.byTier} totalMrr={summary.mrr} />
        <TierLegend tiers={summary.byTier} totalMrr={summary.mrr} />
      </div>
    </Card>
  );
}
