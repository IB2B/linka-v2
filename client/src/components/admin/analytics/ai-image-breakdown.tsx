import type { AiImageStatus } from "@/types/admin-analytics";

const fmt = new Intl.NumberFormat("en-US");

const TONE: Record<AiImageStatus, { bg: string; dot: string; label: string }> = {
  completed:  { bg: "bg-emerald-500", dot: "bg-emerald-500",  label: "Completed" },
  failed:     { bg: "bg-rose-500",    dot: "bg-rose-500",     label: "Failed" },
  generating: { bg: "bg-amber-400",   dot: "bg-amber-400",    label: "Generating" },
  pending:    { bg: "bg-sky-400",     dot: "bg-sky-400",      label: "Pending" },
  skipped:    { bg: "bg-muted-foreground/40", dot: "bg-muted-foreground/40", label: "Skipped" },
};

type Row = { key: AiImageStatus; count: number };

export function AiImageBreakdown({ rows }: { rows: Row[] }) {
  const total = rows.reduce((a, r) => a + r.count, 0);
  if (total === 0) {
    return (
      <p className="px-5 py-6 text-center text-xs tracking-tight text-muted-foreground">
        No image generation activity in this range.
      </p>
    );
  }
  return (
    <div className="space-y-3 px-5 py-4">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
        {rows.map((r) => (
          <span
            key={r.key}
            className={`block h-full ${TONE[r.key].bg}`}
            style={{ width: `${(r.count / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs tracking-tight">
        {rows.map((r) => (
          <li key={r.key} className="inline-flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${TONE[r.key].dot}`} />
            <span className="font-medium">{TONE[r.key].label}</span>
            <span className="tabular-nums text-muted-foreground">
              {fmt.format(r.count)} · {Math.round((r.count / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
