import { Card } from "@/components/ui/card";
import { TrendChart } from "@/components/admin/overview/trend-chart";
import type { SeriesPoint } from "@/lib/admin/get-series";

const fmt = new Intl.NumberFormat("en-US");

export function OverviewTrend({ series }: { series: SeriesPoint[] }) {
  const signups = series.reduce((a, p) => a + p.signups, 0);
  const posts = series.reduce((a, p) => a + p.posts, 0);
  return (
    <Card size="sm" className="gap-3 p-0">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Last 30 days</h3>
          <p className="text-xs tracking-tight text-muted-foreground">
            Signups vs posts generated, per day.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs tracking-tight">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: "var(--chart-1)" }} />
            Signups
            <span className="tabular-nums text-muted-foreground">{fmt.format(signups)}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: "var(--chart-2)" }} />
            Posts
            <span className="tabular-nums text-muted-foreground">{fmt.format(posts)}</span>
          </span>
        </div>
      </div>
      <div className="px-3 pb-3">
        <TrendChart data={series} />
      </div>
    </Card>
  );
}
