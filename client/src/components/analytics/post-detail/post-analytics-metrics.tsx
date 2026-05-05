import { MetricTile } from "./metric-tile";
import { TILES } from "./post-metric-tiles";
import { computeDeltaPct } from "@/lib/analytics/delta-pct";
import type { PostMetrics } from "@/types/analytics";

export function PostAnalyticsMetrics({
  totals, baseline,
}: { totals: PostMetrics; baseline?: PostMetrics }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {TILES.map((tile) => (
        <MetricTile
          key={tile.key} tile={tile} value={totals[tile.key]}
          deltaPct={
            baseline
              ? computeDeltaPct(totals[tile.key], baseline[tile.key])
              : undefined
          }
        />
      ))}
    </div>
  );
}
