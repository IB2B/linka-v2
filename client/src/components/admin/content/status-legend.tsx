import { STATUS_BG, STATUS_LABEL, STATUS_ORDER } from "@/components/admin/content/status-mix-bar";
import type { ContentByStatus } from "@/types/admin-content";

const fmt = new Intl.NumberFormat("en-US");

type Props = { byStatus: ContentByStatus[]; total: number };

export function StatusLegend({ byStatus, total }: Props) {
  if (byStatus.length === 0) return null;
  const map = new Map(byStatus.map((s) => [s.status, s.count]));
  const items = STATUS_ORDER
    .map((status) => ({ status, count: map.get(status) ?? 0 }))
    .filter((s) => s.count > 0 || total > 0);

  return (
    <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => {
        const pct = total > 0 ? (s.count / total) * 100 : 0;
        return (
          <div key={s.status} className="flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${STATUS_BG[s.status]}`} />
              <span className="font-medium tracking-tight">{STATUS_LABEL[s.status]}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium tabular-nums tracking-tight">
                {fmt.format(s.count)}
              </span>
              {total > 0 ? (
                <span className="ml-2 text-[11px] tabular-nums tracking-tight text-muted-foreground">
                  {pct.toFixed(0)}%
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
