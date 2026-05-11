import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const fmt = new Intl.NumberFormat("en-US");

type Funnel = { signups: number; activated: number; engaged: number };

type Step = { label: string; value: number; tone: string; sub: string };

export function FunnelCard({ funnel, days }: { funnel: Funnel; days: number }) {
  const top = Math.max(funnel.signups, 1);
  const actPct = Math.round((funnel.activated / top) * 100);
  const engPct = Math.round((funnel.engaged / top) * 100);
  const steps: Step[] = [
    { label: "Signups", value: funnel.signups, tone: "bg-chart-1/80", sub: "100%" },
    { label: "Activated (≥1 post)", value: funnel.activated, tone: "bg-chart-2/80", sub: `${actPct}%` },
    { label: "Engaged (≥5 posts)", value: funnel.engaged, tone: "bg-chart-3/80", sub: `${engPct}%` },
  ];
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="border-b px-5 py-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Activation funnel ({days}d)
        </h3>
      </div>
      <div className="space-y-3 px-5 py-4">
        {steps.map((s) => {
          const w = top === 0 ? 0 : Math.max((s.value / top) * 100, 4);
          return (
            <div key={s.label} className="space-y-1">
              <div className="flex items-baseline justify-between text-xs tracking-tight">
                <span className="font-medium">{s.label}</span>
                <span className="tabular-nums text-muted-foreground">
                  {fmt.format(s.value)} · {s.sub}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-md bg-muted">
                <span className={cn("block h-full rounded-md", s.tone)}
                  style={{ width: `${w}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
