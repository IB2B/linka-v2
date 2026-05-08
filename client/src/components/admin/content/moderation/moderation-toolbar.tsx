import { ModerationFilter } from "@/components/admin/content/moderation/moderation-filter";
import { ModerationSearch } from "@/components/admin/content/moderation/moderation-search";

const fmt = new Intl.NumberFormat("en-US");

type Props = { active: string; q?: string; total: number };

export function ModerationToolbar({ active, q, total }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <ModerationSearch />
        <ModerationFilter active={active} q={q} />
      </div>
      <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
        {fmt.format(total)} {total === 1 ? "flag" : "flags"}
      </span>
    </div>
  );
}
