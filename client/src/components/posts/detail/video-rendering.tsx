import { Clapperboard } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { ShimmerOverlay } from "../shimmer-overlay";

// A render reports queued or rendering and nothing else — there is no
// percentage to read — so the bar is indeterminate. value={null} is what makes
// it sweep; passing a number here would be inventing progress.
export function VideoRendering({ queued }: { queued: boolean }) {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border bg-muted">
      <ShimmerOverlay />
      <div className="relative flex w-full max-w-[15rem] flex-col items-center gap-3 px-4 text-center">
        <Clapperboard className="size-6 text-foreground/60 motion-safe:animate-pulse" />
        <span className="text-sm font-medium text-foreground/80">
          {queued ? "Queuing video…" : "Rendering video…"}
        </span>
        <Progress value={null} className="w-full" aria-label="Rendering video" />
        <span className="text-xs text-muted-foreground">
          1–3 min · safe to leave this page, it keeps rendering
        </span>
      </div>
    </div>
  );
}
