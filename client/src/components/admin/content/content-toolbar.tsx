import { ContentFilter } from "@/components/admin/content/content-filter";
import { ContentSearch } from "@/components/admin/content/content-search";

const fmt = new Intl.NumberFormat("en-US");

type Props = { active: string; q?: string; total: number };

export function ContentToolbar({ active, q, total }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <ContentSearch />
        <ContentFilter active={active} q={q} />
      </div>
      <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
        {fmt.format(total)} {total === 1 ? "post" : "posts"}
      </span>
    </div>
  );
}
