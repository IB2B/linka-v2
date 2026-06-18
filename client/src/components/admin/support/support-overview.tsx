import { Card } from "@/components/ui/card";
import type { SupportSummary } from "@/types/admin-support";

const fmt = new Intl.NumberFormat("en-US");

type Stat = { label: string; value: number; tone?: string };

export function SupportOverview({ summary }: { summary: SupportSummary }) {
  const stats: Stat[] = [
    { label: "Open", value: summary.open, tone: "text-blue-600 dark:text-blue-400" },
    { label: "Pending", value: summary.pending, tone: "text-amber-600 dark:text-amber-400" },
    { label: "Urgent", value: summary.urgent, tone: "text-red-600 dark:text-red-400" },
    { label: "Resolved", value: summary.resolved, tone: "text-emerald-600 dark:text-emerald-400" },
    { label: "Last 7 days", value: summary.last7d },
  ];
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="grid grid-cols-2 divide-y divide-x sm:grid-cols-5 sm:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 px-5 py-4">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {s.label}
            </span>
            <span className={`font-display text-3xl font-semibold tabular-nums tracking-tight ${s.tone ?? ""}`}>
              {fmt.format(s.value)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
