import { Info } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function EngagementNotice() {
  return (
    <Card className="border-amber-500/30 bg-amber-500/5">
      <CardContent className="flex items-start gap-3 py-4">
        <Info className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="space-y-1 text-sm">
          <p className="font-medium">Engagement metrics coming soon</p>
          <p className="text-muted-foreground">
            Impressions, likes, comments, and follower growth will appear once
            Late&apos;s analytics integration is wired in. Today&apos;s view tracks
            generation, scheduling, and publishing activity from this app.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
