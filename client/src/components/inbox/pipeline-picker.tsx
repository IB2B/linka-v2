import { ChevronRight, Check } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type Pipeline = { id: string; name: string; stages: { id: string; name: string }[] };

export function PipelineList({
  pipelines, onSelect,
}: { pipelines: Pipeline[]; onSelect: (p: Pipeline) => void }) {
  return (
    <ul className="space-y-1">
      {pipelines.map((p) => (
        <li key={p.id}>
          <button
            onClick={() => onSelect(p)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-accent transition-colors"
          >
            {p.name}
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function StagePicker({
  pipeline, onBack, onPick, pending,
}: { pipeline: Pipeline; onBack: () => void; onPick: (id: string) => void; pending: boolean }) {
  return (
    <div className="space-y-2">
      <button onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground">
        ← {pipeline.name}
      </button>
      <p className="text-xs text-muted-foreground px-1">Pick a stage</p>
      <ul className="space-y-1">
        {pipeline.stages.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => onPick(s.id)}
              disabled={pending}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-accent transition-colors",
                pending && "opacity-50",
              )}
            >
              {s.name}
              {pending ? <Spinner className="size-3.5" /> : <Check className="size-4 text-muted-foreground" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
