import { Card } from "@/components/ui/card";
import { AiImageBreakdown } from "@/components/admin/analytics/ai-image-breakdown";
import type { AiUsage } from "@/types/admin-analytics";

const fmt = new Intl.NumberFormat("en-US");

type Stat = { label: string; value: string; hint?: string };

function pct(n: number, d: number): number {
  return d === 0 ? 0 : Math.round((n / d) * 1000) / 10;
}

export function AiUsageCard({ ai, days }: { ai: AiUsage; days: number }) {
  const imageAttempts = ai.imagesCompleted + ai.imagesFailed;
  const imgFail = pct(ai.imagesFailed, imageAttempts);
  const postRate = pct(ai.posted, ai.drafts);
  const stats: Stat[] = [
    { label: "Drafts generated", value: fmt.format(ai.drafts), hint: `last ${days}d` },
    { label: "Images generated", value: fmt.format(ai.imagesCompleted) },
    { label: "Image failure rate", value: `${imgFail}%`, hint: `${fmt.format(ai.imagesFailed)} failed` },
    { label: "Draft → posted", value: `${postRate}%`, hint: `${fmt.format(ai.posted)} posted` },
  ];
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex items-end justify-between border-b px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">AI usage</h3>
          <p className="text-xs tracking-tight text-muted-foreground">
            What AI produced in the last {days} days.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 px-5 py-4">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {s.label}
            </span>
            <span className="font-display text-2xl font-semibold tabular-nums tracking-tight">
              {s.value}
            </span>
            {s.hint ? (
              <span className="text-[11px] tracking-tight text-muted-foreground">
                {s.hint}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="flex items-center justify-between px-5 pt-3">
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Image generation outcomes
          </h4>
        </div>
        <AiImageBreakdown rows={ai.imageBreakdown} />
      </div>
    </Card>
  );
}
