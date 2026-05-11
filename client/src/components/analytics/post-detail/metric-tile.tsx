import {
  Card, CardContent, CardDescription, CardTitle,
} from "@/components/ui/card";
import { DeltaChip } from "./delta-chip";
import { formatTile, type Tile } from "./post-metric-tiles";

export function MetricTile({
  tile, value, deltaPct,
}: { tile: Tile; value: number; deltaPct?: number | null }) {
  const Icon = tile.icon;
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 py-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="size-4" />
          <CardDescription className="text-xs">{tile.label}</CardDescription>
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {formatTile(value, tile.format)}
          </CardTitle>
          {deltaPct !== undefined && value > 0 ? <DeltaChip pct={deltaPct} /> : null}
        </div>
      </CardContent>
    </Card>
  );
}
