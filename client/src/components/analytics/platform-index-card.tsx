import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { PlatformIndexRow } from "./platform-index-row";
import type { PlatformMetricRow } from "@/lib/analytics/get-platform-metrics";

export function PlatformIndexCard({ platforms }: { platforms: PlatformMetricRow[] }) {
  if (platforms.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Platform performance</CardTitle>
          <CardDescription>Avg metrics per published post, by platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No posted content yet.</p>
        </CardContent>
      </Card>
    );
  }

  const maxViews = Math.max(...platforms.map((p) => p.avgViews), 1);
  const maxLikes = Math.max(...platforms.map((p) => p.avgLikes), 1);
  const maxComments = Math.max(...platforms.map((p) => p.avgComments), 1);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Platform performance</CardTitle>
        <CardDescription>Avg metrics per published post, by platform.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-3 py-2 font-medium">Platform</th>
                <th className="px-3 py-2 text-right font-medium">Avg views</th>
                <th className="px-3 py-2 text-right font-medium">Avg likes</th>
                <th className="px-3 py-2 text-right font-medium">Avg comments</th>
                <th className="px-3 py-2 text-right font-medium">Eng. rate</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p) => (
                <PlatformIndexRow key={p.platform} row={p}
                  maxViews={maxViews} maxLikes={maxLikes}
                  maxComments={maxComments} />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
