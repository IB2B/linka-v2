import { Radar } from "lucide-react";

export function TrendsEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card/40 p-12 text-center">
      <Radar className="size-8 text-muted-foreground" />
      <div className="space-y-1">
        <p className="text-sm font-medium">No trends yet</p>
        <p className="text-xs text-muted-foreground">
          Click <span className="font-medium text-foreground">Refresh</span> to scan the latest news in your niche.
        </p>
      </div>
    </div>
  );
}
