import { SubscriptionsFilter } from "@/components/admin/subscriptions/subscriptions-filter";
import { SubscriptionsSearch } from "@/components/admin/subscriptions/subscriptions-search";

const fmt = new Intl.NumberFormat("en-US");

type Props = { active: string; q?: string; total: number };

export function SubscriptionsToolbar({ active, q, total }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <SubscriptionsSearch />
        <SubscriptionsFilter active={active} q={q} />
      </div>
      <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
        {fmt.format(total)} {total === 1 ? "result" : "results"}
      </span>
    </div>
  );
}
