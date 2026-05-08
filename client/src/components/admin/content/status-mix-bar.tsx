import type { ContentByStatus } from "@/types/admin-content";

export const STATUS_BG: Record<string, string> = {
  posted: "bg-emerald-500",
  scheduled: "bg-amber-500",
  draft: "bg-muted-foreground/40",
  failed: "bg-rose-500",
};

export const STATUS_LABEL: Record<string, string> = {
  posted: "Posted",
  scheduled: "Scheduled",
  draft: "Drafts",
  failed: "Failed",
};

export const STATUS_ORDER = ["posted", "scheduled", "draft", "failed"];

function sortByStatus(items: ContentByStatus[]): ContentByStatus[] {
  return [...items].sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status),
  );
}

export function StatusMixBar({ byStatus, total }: { byStatus: ContentByStatus[]; total: number }) {
  const denom = Math.max(total, 1);
  const segments = sortByStatus(byStatus.filter((s) => s.count > 0));
  return (
    <div className="flex h-2 gap-0.5 overflow-hidden rounded-full bg-muted">
      {segments.map((s) => {
        const pct = (s.count / denom) * 100;
        return (
          <div
            key={s.status}
            className={`${STATUS_BG[s.status] ?? "bg-foreground/40"} transition-all`}
            style={{ width: `${pct}%` }}
            title={`${STATUS_LABEL[s.status] ?? s.status}: ${pct.toFixed(0)}%`}
          />
        );
      })}
    </div>
  );
}
