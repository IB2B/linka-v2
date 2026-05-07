import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { EngagementChart } from "./engagement-chart";
import type { EngagementDay } from "@/lib/dashboard/engagement.types";

export function EngagementCard({ data }: { data: EngagementDay[] }) {
  const hasData = data.some((d) =>
    d.likes + d.comments + d.views + d.impressions > 0,
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement</CardTitle>
        <CardDescription>
          Likes, comments, views & impressions over the last {data.length} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <EngagementChart data={data} />
        ) : (
          <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
            No engagement data yet — published posts will show metrics here.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
