import { Card } from "@/components/ui/card";
import { AiImageBreakdown } from "@/components/admin/analytics/ai-image-breakdown";
import type { AiImageStatus } from "@/types/admin-analytics";

type Row = { key: AiImageStatus; count: number };

export function ImageOutcomesCard({ rows }: { rows: Row[] }) {
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="border-b px-5 py-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Image generation outcomes
        </h3>
      </div>
      <AiImageBreakdown rows={rows} />
    </Card>
  );
}
