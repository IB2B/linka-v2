"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import type { Opportunity, Stage } from "@/types/pipeline";
import { moveOpportunityAction } from "@/app/dashboard/pipeline/actions";

export function usePipelineBoard(initial: Opportunity[]) {
  const [opps, setOpps] = useState<Opportunity[]>(initial);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [, start] = useTransition();

  const byStage = useMemo(() => {
    const map = new Map<string, Opportunity[]>();
    for (const o of opps) {
      const arr = map.get(o.stageId) ?? [];
      arr.push(o);
      map.set(o.stageId, arr);
    }
    for (const arr of map.values()) arr.sort((a, b) => a.position - b.position);
    return map;
  }, [opps]);

  function commitMove(id: string, stageId: string, position: number, stages: Stage[]) {
    const stage = stages.find((s) => s.id === stageId);
    if (!stage) return;
    setOpps((prev) => prev.map((o) =>
      o.id === id ? { ...o, stageId, position, status: stage.outcome } : o,
    ));
    start(async () => {
      const res = await moveOpportunityAction(id, stageId, position);
      if ("error" in res) toast.error(res.error);
    });
  }

  function dropOnCard(stages: Stage[], stageId: string, beforeOppId: string) {
    if (!draggingId || draggingId === beforeOppId) return;
    const target = opps.find((o) => o.id === beforeOppId);
    if (!target) return;
    commitMove(draggingId, stageId, target.position, stages);
  }

  function dropAtEnd(stages: Stage[], stageId: string) {
    if (!draggingId) return;
    const list = byStage.get(stageId) ?? [];
    const last = list[list.length - 1];
    const position = last ? last.position + 1 : 0;
    commitMove(draggingId, stageId, position, stages);
  }

  return {
    opps, setOpps, byStage, draggingId, setDraggingId, dropOnCard, dropAtEnd,
  };
}
