import { SupportFilter } from "@/components/admin/support/support-filter";
import { SupportSearch } from "@/components/admin/support/support-search";

const fmt = new Intl.NumberFormat("en-US");

type Props = { active: string; q?: string; total: number };

export function SupportToolbar({ active, q, total }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <SupportSearch />
        <SupportFilter active={active} q={q} />
      </div>
      <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
        {fmt.format(total)} {total === 1 ? "ticket" : "tickets"}
      </span>
    </div>
  );
}
