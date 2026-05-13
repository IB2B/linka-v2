import { ImageOff, ImageIcon } from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import type { ImageRoiData, ImageRoiGroup } from "@/lib/analytics/get-image-roi";

function Col({ group, label, icon: Icon }: {
  group: ImageRoiGroup | null; label: string; icon: React.ElementType;
}) {
  if (!group) return (
    <div className="flex flex-1 flex-col gap-3 rounded-xl border bg-muted/20 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Icon className="size-4" />{label}
      </div>
      <p className="text-xs text-muted-foreground">No data yet.</p>
    </div>
  );
  const rows: { label: string; value: number }[] = [
    { label: "Avg views", value: group.avgViews },
    { label: "Avg impressions", value: group.avgImpressions },
    { label: "Avg likes", value: group.avgLikes },
    { label: "Avg comments", value: group.avgComments },
    { label: "Avg shares", value: group.avgShares },
    { label: "Avg saves", value: group.avgSaves },
  ];
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-xl border bg-muted/20 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Icon className="size-4" />{label}
        </div>
        <span className="text-xs text-muted-foreground">{group.postCount} posts</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{r.label}</span>
            <span className="tabular-nums font-medium">{r.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ImageRoiCard({ data }: { data: ImageRoiData }) {
  const neither = !data.withImage && !data.withoutImage;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image ROI</CardTitle>
        <CardDescription>Avg engagement for posts with vs without an AI-generated image.</CardDescription>
      </CardHeader>
      <CardContent>
        {neither ? (
          <p className="text-sm text-muted-foreground">No posted content yet.</p>
        ) : (
          <div className="flex gap-3">
            <Col group={data.withImage} label="With image" icon={ImageIcon} />
            <Col group={data.withoutImage} label="Without image" icon={ImageOff} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
