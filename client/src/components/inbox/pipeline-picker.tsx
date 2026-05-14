import { ArrowLeft, ChevronRight, Layers } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

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
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-accent transition-colors group"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
              <Layers className="size-4" />
            </span>
            <span className="flex-1 text-left font-medium">{p.name}</span>
            <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
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
    <div className="space-y-3">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        {pipeline.name}
      </button>
      <p className="text-xs font-medium text-muted-foreground px-1 uppercase tracking-wide">
        Select a stage
      </p>
      <ul className="space-y-1">
        {pipeline.stages.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => onPick(s.id)}
              disabled={pending}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-accent transition-colors disabled:opacity-50 group"
            >
              <span className="size-2 rounded-full bg-primary/60 shrink-0" />
              <span className="flex-1 text-left font-medium">{s.name}</span>
              {pending
                ? <Spinner className="size-3.5" />
                : <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
