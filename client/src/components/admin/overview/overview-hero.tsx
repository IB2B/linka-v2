import { Card } from "@/components/ui/card";
import { DeltaBadge } from "@/components/admin/overview/delta-badge";
import type { AdminStats } from "@/types/admin";

const fmt = new Intl.NumberFormat("en-US");

type HeroStat = {
  label: string;
  value: number;
  caption: string;
  delta?: { curr: number; prev: number };
};

export function OverviewHero({ stats }: { stats: AdminStats }) {
  const items: HeroStat[] = [
    {
      label: "Total users", value: stats.users.total,
      caption: `${fmt.format(stats.users.newThisWeek)} new this week`,
      delta: { curr: stats.users.newThisWeek, prev: stats.users.newPrevWeek },
    },
    {
      label: "Posts (30d)", value: stats.posts.thisMonth,
      caption: `${fmt.format(stats.posts.total)} all time`,
      delta: { curr: stats.posts.thisMonth, prev: stats.posts.prevMonth },
    },
    {
      label: "Paying subscribers", value: stats.subscriptions.paying,
      caption: `${fmt.format(stats.subscriptions.free)} on free`,
    },
    {
      label: "Active users", value: stats.users.active,
      caption: `${fmt.format(stats.users.suspended)} suspended`,
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
                {fmt.format(s.value)}
              </span>
              {s.delta ? <DeltaBadge curr={s.delta.curr} prev={s.delta.prev} /> : null}
            </div>
            <span className="text-xs tracking-tight text-muted-foreground">{s.caption}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
