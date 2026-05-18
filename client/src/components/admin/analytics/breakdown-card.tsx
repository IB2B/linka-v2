import { Card } from "@/components/ui/card";
import type { CountRow } from "@/types/admin-analytics";

const fmt = new Intl.NumberFormat("en-US");

type Props = {
  title: string;
  rows: CountRow[];
  emptyText?: string;
  format?: (key: string) => string;
  icon?: (key: string) => React.ReactNode;
  barClassName?: string;
  rowColor?: (key: string) => string;
};

export function BreakdownCard({
  title, rows, emptyText, format, icon, barClassName, rowColor,
}: Props) {
  const total = rows.reduce((a, r) => a + r.count, 0);
  return (
    <Card size="sm" className="gap-0 p-0 transition hover:ring-foreground/20">
      <div className="flex items-center justify-between border-b px-5 py-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
          {fmt.format(total)}
        </span>
      </div>
      {rows.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm tracking-tight text-muted-foreground">
          {emptyText ?? "No data yet."}
        </div>
      ) : (
        <ul className="space-y-2.5 px-5 py-4">
          {rows.map((r) => {
            const pct = total === 0 ? 0 : Math.round((r.count / total) * 100);
            const color = rowColor?.(r.key);
            return (
              <li key={r.key} className="space-y-1">
                <div className="flex items-baseline justify-between gap-2 text-xs tracking-tight">
                  <span className="flex items-center gap-1.5 font-medium capitalize">
                    {icon?.(r.key)}
                    {format ? format(r.key) : r.key}
                  </span>
                  <span className="text-muted-foreground tabular-nums">
                    {fmt.format(r.count)} · {pct}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className={`block h-full ${barClassName ?? "bg-foreground/70"}`}
                    style={color ? { width: `${pct}%`, background: color } : { width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
