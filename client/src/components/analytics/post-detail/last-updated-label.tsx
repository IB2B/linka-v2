import { Clock } from "lucide-react";
import { formatRelativeTime } from "@/lib/analytics/format-relative-time";

export function LastUpdatedLabel({
  lastUpdated,
}: { lastUpdated: string | null }) {
  if (!lastUpdated) return <span />;
  return (
    <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Clock className="size-3.5" />
      Provider data synced {formatRelativeTime(lastUpdated)}
    </p>
  );
}
