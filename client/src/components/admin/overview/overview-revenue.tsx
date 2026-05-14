import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RevenueChart } from "@/components/admin/overview/revenue-chart";
import type { RevenuePoint } from "@/lib/admin/get-revenue";

const fmtMoney = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n.toLocaleString()}`;

export function OverviewRevenue({ revenue }: { revenue: RevenuePoint[] }) {
  const total = revenue.reduce((s, p) => s + p.revenue, 0);
  const current = revenue[revenue.length - 1]?.revenue ?? 0;
  const prev = revenue[revenue.length - 2]?.revenue ?? 0;
  const pct = prev === 0 ? null : ((current - prev) / prev) * 100;

  return (
    <Card size="sm" className="gap-3 p-0">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b px-5 py-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground tracking-tight mb-1">
            <TrendingUp className="size-3.5" /> Monthly Revenue
          </div>
          <p className="text-2xl font-semibold tabular-nums tracking-tight">
            {fmtMoney(current)}
          </p>
          <p className="text-xs tracking-tight text-muted-foreground mt-0.5">
            This month · {fmtMoney(total)} over 12 months
            {pct !== null && (
              <span className={pct >= 0 ? "text-emerald-500 ml-1.5" : "text-rose-500 ml-1.5"}>
                {pct >= 0 ? "+" : ""}{pct.toFixed(1)}% vs last month
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="px-3 pb-3">
        <RevenueChart data={revenue} />
      </div>
    </Card>
  );
}
