import type { StageOutcome } from "@/types/pipeline";

type Props = { name: string; count: number; outcome: StageOutcome };

const DOT: Record<StageOutcome, string> = {
  open: "bg-foreground/30",
  won: "bg-emerald-500",
  lost: "bg-rose-500",
};

export function PipelineColumnHeader({ name, count, outcome }: Props) {
  return (
    <div className="mb-2 flex items-center justify-between gap-2 px-1">
      <div className="flex items-center gap-2">
        <span className={`size-1.5 rounded-full ${DOT[outcome]}`} aria-hidden />
        <h3 className="text-sm font-semibold text-foreground">{name}</h3>
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {count}
        </span>
      </div>
    </div>
  );
}
