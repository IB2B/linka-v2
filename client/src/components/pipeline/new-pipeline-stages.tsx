"use client";

import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { StageOutcome } from "@/types/pipeline";

export type StageDraft = { name: string; outcome: StageOutcome };

const OUTCOMES: StageOutcome[] = ["open", "won", "lost"];

type Props = {
  stages: StageDraft[];
  onChange: (next: StageDraft[]) => void;
};

export function NewPipelineStages({ stages, onChange }: Props) {
  function update(i: number, patch: Partial<StageDraft>) {
    onChange(stages.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }
  function remove(i: number) {
    onChange(stages.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...stages, { name: "", outcome: "open" }]);
  }

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Stages</span>
        <Button type="button" size="sm" variant="ghost" onClick={add}>
          <Plus className="size-3.5" /> Add stage
        </Button>
      </div>
      {stages.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          Optional. Add stages now or later from the board.
        </p>
      ) : null}
      {stages.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={s.name}
            onChange={(e) => update(i, { name: e.target.value })}
            maxLength={80}
            placeholder={`Stage ${i + 1} name`}
            className="flex-1 rounded-md border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
          <select
            value={s.outcome}
            onChange={(e) => update(i, { outcome: e.target.value as StageOutcome })}
            className="rounded-md border bg-background px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          >
            {OUTCOMES.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <Button type="button" size="icon" variant="ghost" onClick={() => remove(i)}>
            <X className="size-3.5" />
          </Button>
        </div>
      ))}
    </div>
  );
}
