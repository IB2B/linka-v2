import { REASON_BG, REASON_LABEL } from "@/components/admin/content/moderation/reason-meta";
import type { FlagsByReason } from "@/types/admin-moderation";

const fmt = new Intl.NumberFormat("en-US");

export function ReasonLegend({ reasons, total }: { reasons: FlagsByReason[]; total: number }) {
  if (reasons.length === 0) {
    return (
      <p className="text-sm tracking-tight text-muted-foreground">
        No open flags right now.
      </p>
    );
  }
  return (
    <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
      {reasons.map((r) => {
        const pct = total > 0 ? (r.count / total) * 100 : 0;
        return (
          <div key={r.reason} className="flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${REASON_BG[r.reason]}`} />
              <span className="font-medium tracking-tight">
                {REASON_LABEL[r.reason] ?? r.reason}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium tabular-nums tracking-tight">
                {fmt.format(r.count)}
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
