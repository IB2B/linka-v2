import Link from "next/link";
import { BarChart3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AnalyticsEmpty() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
        <BarChart3 className="size-10 text-muted-foreground" />
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">No data yet</h3>
          <p className="text-sm text-muted-foreground">
            Generate your first post to start seeing analytics.
          </p>
        </div>
        <Button render={<Link href="/dashboard/generate" />} nativeButton={false}>
          Generate a post
        </Button>
      </CardContent>
    </Card>
  );
}
