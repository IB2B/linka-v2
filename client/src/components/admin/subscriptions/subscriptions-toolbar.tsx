import { SubscriptionsFilter } from "@/components/admin/subscriptions/subscriptions-filter";
import { SubscriptionsSearch } from "@/components/admin/subscriptions/subscriptions-search";
import { SubscriptionsDateRange } from "@/components/admin/subscriptions/subscriptions-date-range";

const fmt = new Intl.NumberFormat("en-US");

type Props = { active: string; q?: string; total: number; from?: string; to?: string };

export function SubscriptionsToolbar({ active, q, total, from, to }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <SubscriptionsSearch />
        <SubscriptionsFilter active={active} q={q} />
        <SubscriptionsDateRange from={from} to={to} />
      </div>
      <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
        {fmt.format(total)} {total === 1 ? "result" : "results"}
      </span>
    </div>
  );
}
