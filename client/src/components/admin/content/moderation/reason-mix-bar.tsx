import { REASON_BG, REASON_LABEL } from "@/components/admin/content/moderation/reason-meta";
import type { FlagsByReason } from "@/types/admin-moderation";

export function ReasonMixBar({ reasons, total }: { reasons: FlagsByReason[]; total: number }) {
  const denom = Math.max(total, 1);
  if (total === 0) {
    return <div className="h-2 rounded-full bg-muted" />;
  }
  return (
    <div className="flex h-2 gap-0.5 overflow-hidden rounded-full bg-muted">
      {reasons.map((r) => {
        const pct = (r.count / denom) * 100;
        return (
          <div
            key={r.reason}
            className={`${REASON_BG[r.reason] ?? "bg-foreground/40"} transition-all`}
            style={{ width: `${pct}%` }}
            title={`${REASON_LABEL[r.reason] ?? r.reason}: ${pct.toFixed(0)}%`}
          />
        );
      })}
    </div>
  );
}
