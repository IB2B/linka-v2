import { RefreshAnalyticsButton } from "./refresh-analytics-button";
import { LastUpdatedLabel } from "./last-updated-label";

export function AnalyticsToolbar({
  lastUpdated, postId,
}: { lastUpdated: string | null; postId: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <LastUpdatedLabel lastUpdated={lastUpdated} />
      <RefreshAnalyticsButton postId={postId} />
    </div>
  );
}
