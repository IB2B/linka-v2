"use client";

import { useState } from "react";

import type { Opportunity, Stage } from "@/types/pipeline";
import { PipelineCard } from "./pipeline-card";
import { PipelineColumnHeader } from "./pipeline-column-header";

type Props = {
  stage: Stage;
  opps: Opportunity[];
  draggingId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDropOnCard: (stageId: string, beforeOppId: string) => void;
  onDropAtEnd: (stageId: string) => void;
  onCardClick: (id: string) => void;
};

export function PipelineColumn({
  stage, opps, draggingId,
  onDragStart, onDragEnd, onDropOnCard, onDropAtEnd, onCardClick,
}: Props) {
  const [over, setOver] = useState(false);

  return (
    <div className="flex h-full w-72 shrink-0 flex-col">
      <PipelineColumnHeader name={stage.name} count={opps.length} outcome={stage.outcome} />
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          onDropAtEnd(stage.id);
        }}
        className={`min-h-0 flex-1 overflow-y-auto rounded-xl border border-dashed bg-muted/30 p-2 transition-colors ${
          over ? "border-foreground/30 bg-muted/60" : "border-transparent"
        }`}
      >
        {opps.map((opp) => (
          <PipelineCard
            key={opp.id}
            opp={opp}
            isDragging={draggingId === opp.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDropBefore={(id) => onDropOnCard(stage.id, id)}
            onClick={onCardClick}
          />
        ))}
        {!opps.length ? (
          <p className="px-2 py-8 text-center text-xs text-muted-foreground">
            Drop a card here
          </p>
        ) : null}
      </div>
    </div>
  );
}
