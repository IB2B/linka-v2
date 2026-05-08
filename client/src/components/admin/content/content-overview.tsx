import { CheckCircle2, Clock, FileText, ImageIcon, XCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { KpiPill } from "@/components/admin/subscriptions/kpi-pill";
import { StatusMixBar } from "@/components/admin/content/status-mix-bar";
import { StatusLegend } from "@/components/admin/content/status-legend";
import type { AdminContentSummary } from "@/types/admin-content";

const fmt = new Intl.NumberFormat("en-US");

function deltaText(curr: number, prev: number): string {
  if (prev === 0) return curr > 0 ? "first month of activity" : "no posts last month";
  const pct = Math.round(((curr - prev) / prev) * 100);
  const arrow = pct > 0 ? "↑" : pct < 0 ? "↓" : "→";
  return `${arrow} ${Math.abs(pct)}% vs last month (${fmt.format(prev)})`;
}

export function ContentOverview({ summary }: { summary: AdminContentSummary }) {
  return (
    <Card size="sm" className="gap-6 px-6 py-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Posts this month
          </span>
          <span className="text-5xl font-semibold tabular-nums tracking-tight">
            {fmt.format(summary.thisMonth)}
          </span>
          <div className="text-sm tracking-tight text-muted-foreground">
            {deltaText(summary.thisMonth, summary.prevMonth)}
            <span className="mx-2" aria-hidden>·</span>
            <span className="tabular-nums">{fmt.format(summary.total)}</span> all-time
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 self-start sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <KpiPill label="Posted" value={fmt.format(summary.posted)} icon={CheckCircle2} tone="success" />
          <KpiPill label="Scheduled" value={fmt.format(summary.scheduled)} icon={Clock} />
          <KpiPill label="Drafts" value={fmt.format(summary.drafts)} icon={FileText} tone="muted" />
          <KpiPill label="Failed" value={fmt.format(summary.failed)} icon={XCircle} tone="warning" />
        </div>
      </div>
      <div className="space-y-3 border-t pt-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Status mix
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs tabular-nums tracking-tight text-muted-foreground">
            <ImageIcon className="size-3.5" />
            {fmt.format(summary.withImage)} with image
          </span>
        </div>
        <StatusMixBar byStatus={summary.byStatus} total={summary.total} />
        <StatusLegend byStatus={summary.byStatus} total={summary.total} />
      </div>
    </Card>
  );
}
