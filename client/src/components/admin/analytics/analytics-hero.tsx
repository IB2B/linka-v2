import { Card } from "@/components/ui/card";
import { DeltaBadge } from "@/components/admin/overview/delta-badge";
import type { AnalyticsOverview } from "@/types/admin-analytics";

const fmt = new Intl.NumberFormat("en-US");

type Item = { label: string; value: string; delta: { curr: number; prev: number } };

function rate(failures: number, published: number): number {
  const denom = failures + published;
  return denom === 0 ? 0 : Math.round((failures / denom) * 1000) / 10;
}

export function AnalyticsHero({ data }: { data: AnalyticsOverview }) {
  const { kpis } = data;
  const fr = rate(kpis.failures.curr, kpis.postsPublished.curr);
  const frPrev = rate(kpis.failures.prev, kpis.postsPublished.prev);
  const items: Item[] = [
    { label: "Signups", value: fmt.format(kpis.signups.curr), delta: kpis.signups },
    { label: "Posts published", value: fmt.format(kpis.postsPublished.curr), delta: kpis.postsPublished },
    { label: "Active publishers", value: fmt.format(kpis.activePublishers.curr), delta: kpis.activePublishers },
    {
      label: "Failure rate",
      value: `${fr}%`,
      delta: { curr: Math.round(frPrev - fr), prev: 0 },
    },
  ];
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="grid grid-cols-2 divide-y divide-x md:grid-cols-4 md:divide-y-0">
        {items.map((s) => (
          <div key={s.label} className="flex flex-col gap-1.5 px-5 py-5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {s.label}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-3xl font-semibold tabular-nums tracking-tight">
                {s.value}
              </span>
              <DeltaBadge curr={s.delta.curr} prev={s.delta.prev} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
