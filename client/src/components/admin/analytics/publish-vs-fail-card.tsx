import { Card } from "@/components/ui/card";
import { FailureTrendChart } from "@/components/admin/analytics/failure-trend-chart";
import type { AnalyticsPoint } from "@/types/admin-analytics";

const fmt = new Intl.NumberFormat("en-US");

export function PublishVsFailCard({ series }: { series: AnalyticsPoint[] }) {
  const totals = series.reduce(
    (a, p) => ({ pub: a.pub + p.published, fail: a.fail + p.failed }),
    { pub: 0, fail: 0 },
  );
  const denom = totals.pub + totals.fail;
  const rate = denom === 0 ? 0 : Math.round((totals.fail / denom) * 1000) / 10;
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Publish vs failure</h3>
          <p className="text-xs tracking-tight text-muted-foreground">
            Daily stacked bars. Failure rate {rate}%.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs tracking-tight">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: "var(--chart-2)" }} />
            Published <span className="tabular-nums text-muted-foreground">{fmt.format(totals.pub)}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: "var(--chart-5)" }} />
            Failed <span className="tabular-nums text-muted-foreground">{fmt.format(totals.fail)}</span>
          </span>
        </div>
      </div>
      <div className="px-3 pb-3">
        <FailureTrendChart data={series} />
      </div>
    </Card>
  );
}
