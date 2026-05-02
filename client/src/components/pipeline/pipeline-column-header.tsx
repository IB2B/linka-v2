import type { Stage, StageOutcome } from "@/types/pipeline";
import { StageMenu } from "./stage-menu";

const DOT: Record<StageOutcome, string> = {
  open: "bg-foreground/30",
  won: "bg-emerald-500",
  lost: "bg-rose-500",
};

type Props = { stage: Stage; count: number };

export function PipelineColumnHeader({ stage, count }: Props) {
  return (
    <div className="mb-2 flex items-center justify-between gap-2 px-1">
      <div className="flex min-w-0 items-center gap-2">
        <span className={`size-1.5 rounded-full ${DOT[stage.outcome]}`} aria-hidden />
        <h3 className="truncate text-sm font-semibold text-foreground">{stage.name}</h3>
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {count}
        </span>
      </div>
      <StageMenu stage={stage} />
    </div>
  );
}
