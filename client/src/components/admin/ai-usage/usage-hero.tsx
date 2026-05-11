import { Card } from "@/components/ui/card";
import { DeltaBadge } from "@/components/admin/overview/delta-badge";
import type { AiUsageOverview } from "@/types/admin-ai-usage";

const fmt = new Intl.NumberFormat("en-US");

type Item = { label: string; value: string; delta: { curr: number; prev: number } };

function rate(failures: number, completed: number): number {
  const denom = failures + completed;
  return denom === 0 ? 0 : Math.round((failures / denom) * 1000) / 10;
}

export function UsageHero({ data }: { data: AiUsageOverview }) {
  const { kpis } = data;
  const fr = rate(kpis.imagesFailed.curr, kpis.imagesCompleted.curr);
  const frPrev = rate(kpis.imagesFailed.prev, kpis.imagesCompleted.prev);
  const items: Item[] = [
    { label: "Drafts generated", value: fmt.format(kpis.drafts.curr), delta: kpis.drafts },
    { label: "Posted", value: fmt.format(kpis.posted.curr), delta: kpis.posted },
    { label: "Images generated", value: fmt.format(kpis.imagesCompleted.curr), delta: kpis.imagesCompleted },
    {
      label: "Image failure rate",
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
