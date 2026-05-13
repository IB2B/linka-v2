import { Card, CardContent } from "@/components/ui/card";
import type { PostAnalyticsResult } from "@/types/analytics";

const COPY: Record<
  Exclude<PostAnalyticsResult["state"], "ok">,
  { title: string; body: string }
> = {
  unposted: {
    title: "Not posted yet",
    body: "Analytics show up here once this post is published via Late.",
  },
  syncing: {
    title: "Analytics syncing",
    body: "The platform hasn't reported metrics yet. This page will refresh automatically every 30 seconds.",
  },
  "addon-required": {
    title: "Analytics add-on required",
    body: "Your Late plan does not include analytics. Enable the add-on to see metrics.",
  },
};

export function AnalyticsStateNotice({
  state,
}: { state: Exclude<PostAnalyticsResult["state"], "ok"> }) {
  const c = COPY[state];
  return (
    <Card>
      <CardContent className="space-y-1 py-6">
        <p className="text-sm font-medium">{c.title}</p>
        <p className="text-sm text-muted-foreground">{c.body}</p>
      </CardContent>
    </Card>
  );
}
