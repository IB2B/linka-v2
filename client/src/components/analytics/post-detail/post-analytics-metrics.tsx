import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";

import {
  Card, CardContent, CardDescription, CardTitle,
} from "@/components/ui/card";

const TILES = [
  { label: "Impressions", icon: Eye },
  { label: "Likes", icon: Heart },
  { label: "Comments", icon: MessageCircle },
  { label: "Shares", icon: Share2 },
] as const;

export function PostAnalyticsMetrics() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {TILES.map(({ label, icon: Icon }) => (
        <Card key={label}>
          <CardContent className="flex flex-col gap-2 py-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon className="size-4" />
              <CardDescription className="text-xs">{label}</CardDescription>
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight">
              —
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Available once Late analytics is wired up.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
