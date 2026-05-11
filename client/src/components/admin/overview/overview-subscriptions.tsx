import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { AdminStats } from "@/types/admin";

const fmt = new Intl.NumberFormat("en-US");

export function OverviewSubscriptions({ stats }: { stats: AdminStats }) {
  const paying = stats.subscriptions.paying;
  const free = stats.subscriptions.free;
  const total = Math.max(paying + free, 1);
  const payingPct = Math.round((paying / total) * 100);
  return (
    <Card size="sm" className="gap-3 px-5 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Subscriptions</h3>
        <Link
          href="/admin/subscriptions"
          className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-muted-foreground hover:text-foreground"
        >
          View all <ArrowRight className="size-3" />
        </Link>
      </div>
      <div>
        <div className="flex items-baseline justify-between">
          <span className="font-heading text-3xl font-semibold tabular-nums tracking-tight">
            {fmt.format(paying)}
          </span>
          <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
            {payingPct}% paying
          </span>
        </div>
        <p className="text-xs tracking-tight text-muted-foreground">paying subscribers</p>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-muted">
        <span className="bg-emerald-500" style={{ width: `${payingPct}%` }} title={`Paying: ${paying}`} />
        <span className="bg-muted-foreground/40" style={{ width: `${100 - payingPct}%` }} title={`Free: ${free}`} />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs tracking-tight">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500" />
          Paying <span className="tabular-nums text-muted-foreground">{fmt.format(paying)}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          Free <span className="tabular-nums text-muted-foreground">{fmt.format(free)}</span>
        </span>
      </div>
    </Card>
  );
}
