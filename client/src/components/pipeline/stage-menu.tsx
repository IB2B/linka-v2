"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal, Pencil, Trash2, Check } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuGroup, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import type { Stage, StageOutcome } from "@/types/pipeline";
import {
  updateStageAction, deleteStageAction,
} from "@/app/dashboard/pipeline/stage-actions";
import { EditStageDialog } from "./edit-stage-dialog";

const OUTCOMES: { value: StageOutcome; label: string; dot: string }[] = [
  { value: "open", label: "Open", dot: "bg-foreground/30" },
  { value: "won", label: "Won", dot: "bg-emerald-500" },
  { value: "lost", label: "Lost", dot: "bg-rose-500" },
];

export function StageMenu({ stage }: { stage: Stage }) {
  const [editOpen, setEditOpen] = useState(false);
  const [pending, start] = useTransition();

  function setOutcome(outcome: StageOutcome) {
    start(async () => {
      const r = await updateStageAction(stage.id, { outcome });
      if ("error" in r) toast.error(r.error);
      else toast.success("Stage updated.");
    });
  }

  function remove() {
    if (!confirm(`Delete "${stage.name}"?`)) return;
    start(async () => {
      const r = await deleteStageAction(stage.id);
      if ("error" in r) toast.error(r.error);
      else toast.success("Stage deleted.");
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Stage actions"
          disabled={pending}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
        >
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="size-4" /> Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Outcome</DropdownMenuLabel>
            {OUTCOMES.map((o) => (
              <DropdownMenuItem key={o.value} onClick={() => setOutcome(o.value)}>
                <span className={`size-1.5 rounded-full ${o.dot}`} />
                {o.label}
                {stage.outcome === o.value ? <Check className="ml-auto size-3.5" /> : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={remove}>
            <Trash2 className="size-4" /> Delete stage
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditStageDialog stage={stage} open={editOpen} onOpenChange={setEditOpen} />
    </>
  );
}
