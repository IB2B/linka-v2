import { Check, Clock, EyeOff, ShieldX } from "lucide-react";

import { Card } from "@/components/ui/card";
import { KpiPill } from "@/components/admin/subscriptions/kpi-pill";
import { ReasonMixBar } from "@/components/admin/content/moderation/reason-mix-bar";
import { ReasonLegend } from "@/components/admin/content/moderation/reason-legend";
import type { ModerationSummary } from "@/types/admin-moderation";

const fmt = new Intl.NumberFormat("en-US");

export function ModerationOverview({ summary }: { summary: ModerationSummary }) {
  const reasonTotal = summary.byReason.reduce((acc, r) => acc + r.count, 0);
  return (
    <Card size="sm" className="gap-6 px-6 py-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Pending review
          </span>
          <span className="text-5xl font-semibold tabular-nums tracking-tight">
            {fmt.format(summary.pending)}
          </span>
          <div className="text-sm tracking-tight text-muted-foreground">
            <span className="tabular-nums">{fmt.format(summary.totalOpen)}</span> open total
            <span className="mx-2" aria-hidden>·</span>
            <span className="tabular-nums">{fmt.format(summary.actionedLast30d)}</span> actioned in 30d
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 self-start sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <KpiPill label="Pending" value={fmt.format(summary.pending)} icon={Clock} tone="warning" />
          <KpiPill label="Reviewing" value={fmt.format(summary.reviewing)} icon={ShieldX} />
          <KpiPill label="Actioned 30d" value={fmt.format(summary.actionedLast30d)} icon={Check} tone="success" />
          <KpiPill label="Dismissed 30d" value={fmt.format(summary.dismissedLast30d)} icon={EyeOff} tone="muted" />
        </div>
      </div>
      <div className="space-y-3 border-t pt-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Open flags by reason
          </span>
          <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
            {fmt.format(reasonTotal)} open
          </span>
        </div>
        <ReasonMixBar reasons={summary.byReason} total={reasonTotal} />
        <ReasonLegend reasons={summary.byReason} total={reasonTotal} />
      </div>
    </Card>
  );
}
