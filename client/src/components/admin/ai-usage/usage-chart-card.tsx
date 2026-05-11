import { Card } from "@/components/ui/card";
import { UsageChart } from "@/components/admin/ai-usage/usage-chart";
import type { AiUsagePoint } from "@/types/admin-ai-usage";

const fmt = new Intl.NumberFormat("en-US");

type Props = { series: AiUsagePoint[]; days: number };

export function UsageChartCard({ series, days }: Props) {
  const totals = series.reduce(
    (a, p) => ({
      drafts: a.drafts + p.drafts,
      images: a.images + p.images,
      failed: a.failed + p.failedImages,
    }),
    { drafts: 0, images: 0, failed: 0 },
  );
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">AI generation over time</h3>
          <p className="text-xs tracking-tight text-muted-foreground">
            Drafts and images generated over the last {days} days.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs tracking-tight">
          <Legend dot="var(--chart-1)" label="Drafts" value={fmt.format(totals.drafts)} />
          <Legend dot="var(--chart-2)" label="Images" value={fmt.format(totals.images)} />
          <Legend dot="var(--chart-5)" label="Failed" value={fmt.format(totals.failed)} />
        </div>
      </div>
      <div className="px-3 pb-3">
        <UsageChart data={series} />
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
