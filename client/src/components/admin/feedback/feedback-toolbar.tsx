import { FeedbackFilter } from "@/components/admin/feedback/feedback-filter";
import { FeedbackSearch } from "@/components/admin/feedback/feedback-search";
import { FeedbackExportButton } from "@/components/admin/feedback/feedback-export-button";
import type { FeedbackRow } from "@/types/admin-feedback";

const fmt = new Intl.NumberFormat("en-US");

type Props = { active: string; q?: string; total: number; rows: FeedbackRow[] };

export function FeedbackToolbar({ active, q, total, rows }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <FeedbackSearch />
        <FeedbackFilter active={active} q={q} />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
          {fmt.format(total)} {total === 1 ? "item" : "items"}
        </span>
        <FeedbackExportButton rows={rows} />
      </div>
    </div>
  );
}
