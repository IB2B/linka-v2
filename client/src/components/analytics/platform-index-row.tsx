import { PlatformIcon } from "@/components/accounts/platform-icon";
import type { Platform } from "@/lib/zernio/zernio-account.types";
import type { PlatformMetricRow } from "@/lib/analytics/get-platform-metrics";

function Cell({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.min((value / max) * 100, 100);
  return (
    <td className="px-3 py-2.5 text-right text-sm tabular-nums">
      <div className="flex items-center justify-end gap-2">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary/60" style={{ width: `${pct}%` }} />
        </div>
        {value.toLocaleString()}
      </div>
    </td>
  );
}

export function PlatformIndexRow({
  row, maxViews, maxLikes, maxComments,
}: {
  row: PlatformMetricRow;
  maxViews: number; maxLikes: number; maxComments: number;
}) {
  const isKnown = row.platform !== "unspecified";
  return (
    <tr className="border-b last:border-0 hover:bg-muted/30 transition-colors">
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-2">
          {isKnown && <PlatformIcon platform={row.platform as Platform} className="size-4 shrink-0" />}
          <span className="text-sm font-medium capitalize">{row.platform}</span>
          <span className="text-xs text-muted-foreground">({row.postCount})</span>
        </div>
      </td>
      <Cell value={row.avgViews} max={maxViews} />
      <Cell value={row.avgLikes} max={maxLikes} />
      <Cell value={row.avgComments} max={maxComments} />
      <td className="px-3 py-2.5 text-right text-sm tabular-nums text-muted-foreground">
        {(row.avgEngagementRate * 100).toFixed(1)}%
      </td>
    </tr>
  );
}
