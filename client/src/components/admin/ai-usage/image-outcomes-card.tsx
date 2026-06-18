import { Card } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";
import type { AiImageStatus } from "@/types/admin-analytics";

type Row = { key: AiImageStatus; count: number };

const TONE: Record<AiImageStatus, { dot: string; label: string }> = {
  completed:  { dot: "bg-emerald-500",         label: "Completed" },
  failed:     { dot: "bg-rose-500",            label: "Failed" },
  generating: { dot: "bg-amber-500",           label: "Generating" },
  pending:    { dot: "bg-sky-500",             label: "Pending" },
  skipped:    { dot: "bg-muted-foreground/50", label: "Skipped" },
};

const ORDER = Object.keys(TONE) as AiImageStatus[];

export function ImageOutcomesCard({ rows }: { rows: Row[] }) {
  const map: Record<string, number> = {};
  for (const r of rows) map[r.key] = r.count;
  const total = rows.reduce((a, r) => a + r.count, 0);
  const ok = map.completed ?? 0;
  const successPct = total === 0 ? 0 : Math.round((ok / total) * 100);

  return (
    <Card size="sm" className="gap-0 p-0 transition hover:ring-foreground/20">
      <div className="flex items-center gap-2 border-b px-5 py-3">
        <ImagePlus className="size-3.5 text-muted-foreground" />
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Image outcomes
        </h3>
      </div>
      {total === 0 ? (
        <div className="px-5 py-10 text-center text-sm tracking-tight text-muted-foreground">
          No image activity in this range.
        </div>
      ) : (
        <div className="space-y-4 px-5 py-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-semibold tabular-nums tracking-tight text-emerald-600 dark:text-emerald-400">
              {successPct}%
            </span>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Success rate
            </span>
          </div>
          <ul className="space-y-1.5 border-t pt-3">
            {ORDER.filter((k) => (map[k] ?? 0) > 0).map((k) => (
              <li key={k} className="flex items-center justify-between gap-2 text-xs tracking-tight">
                <span className="flex items-center gap-1.5">
                  <span className={`size-1.5 rounded-full ${TONE[k].dot}`} />
                  {TONE[k].label}
                </span>
                <span className="font-medium tabular-nums">{map[k]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
