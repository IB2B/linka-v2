import { SegmentedMeter } from "@/components/segmented-meter";

type Props = { label: string; used: number; limit: number };

// One quota line in the sidebar plan card: label, used/limit, and a meter.
export function SidebarUsageRow({ label, used, limit }: Props) {
  const pct = limit > 0 ? Math.round((used / limit) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums text-muted-foreground">
          {used}/{limit}
        </span>
      </div>
      <SegmentedMeter pct={pct} segments={22} />
    </div>
  );
}
