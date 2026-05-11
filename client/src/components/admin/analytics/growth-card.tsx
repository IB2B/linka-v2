import { Card } from "@/components/ui/card";
import { GrowthChart } from "@/components/admin/analytics/growth-chart";
import type { AnalyticsPoint } from "@/types/admin-analytics";

const fmt = new Intl.NumberFormat("en-US");

type Props = { series: AnalyticsPoint[]; days: number };

export function GrowthCard({ series, days }: Props) {
  const totals = series.reduce(
    (a, p) => ({
      signups: a.signups + p.signups,
      published: a.published + p.published,
      failed: a.failed + p.failed,
    }),
    { signups: 0, published: 0, failed: 0 },
  );
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Growth & throughput</h3>
          <p className="text-xs tracking-tight text-muted-foreground">
            Signups, published posts and failures over the last {days} days.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs tracking-tight">
          <Legend dot="var(--chart-1)" label="Signups" value={fmt.format(totals.signups)} />
          <Legend dot="var(--chart-2)" label="Published" value={fmt.format(totals.published)} />
          <Legend dot="var(--chart-5)" label="Failed" value={fmt.format(totals.failed)} />
        </div>
      </div>
      <div className="px-3 pb-3">
        <GrowthChart data={series} />
      </div>
    </Card>
  );
}

function Legend({ dot, label, value }: { dot: string; label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-2 rounded-full" style={{ background: dot }} />
      {label} <span className="tabular-nums text-muted-foreground">{value}</span>
    </span>
  );
}
