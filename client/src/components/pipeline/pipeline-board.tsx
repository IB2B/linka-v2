"use client";

import { useState } from "react";

import type { Opportunity, Stage } from "@/types/pipeline";
import { PipelineColumn } from "./pipeline-column";
import { OpportunityDetailSheet } from "./opportunity-detail-sheet";
import { usePipelineBoard } from "./use-pipeline-board";

type Props = { stages: Stage[]; opportunities: Opportunity[] };

export function PipelineBoard({ stages, opportunities }: Props) {
  const board = usePipelineBoard(opportunities);
  const [openId, setOpenId] = useState<string | null>(null);
  const openOpp = openId ? board.opps.find((o) => o.id === openId) ?? null : null;

  return (
    <>
      <div className="-mx-6 min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-6 pb-2">
        <div className="flex h-full gap-3">
          {stages.map((stage) => (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              opps={board.byStage.get(stage.id) ?? []}
              draggingId={board.draggingId}
              onDragStart={(id) => board.setDraggingId(id)}
              onDragEnd={() => board.setDraggingId(null)}
              onDropOnCard={(stageId, beforeId) =>
                board.dropOnCard(stages, stageId, beforeId)
              }
              onDropAtEnd={(stageId) => board.dropAtEnd(stages, stageId)}
              onCardClick={(id) => setOpenId(id)}
            />
          ))}
        </div>
      </div>
      <OpportunityDetailSheet
        opp={openOpp}
        onClose={() => setOpenId(null)}
      />
    </>
  );
}
