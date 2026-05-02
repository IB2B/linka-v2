"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Opportunity } from "@/types/pipeline";
import {
  deleteOpportunityAction, updateOpportunityAction,
} from "@/app/dashboard/pipeline/actions";
import { PipelinePlatformPill } from "./pipeline-platform-pill";

type Props = { opp: Opportunity | null; onClose: () => void };

export function OpportunityDetailSheet({ opp, onClose }: Props) {
  const [pending, start] = useTransition();

  function saveNotes(notes: string) {
    if (!opp) return;
    start(async () => {
      const res = await updateOpportunityAction(opp.id, { notes });
      if ("error" in res) toast.error(res.error);
      else toast.success("Saved.");
    });
  }

  function onDelete() {
    if (!opp) return;
    start(async () => {
      const res = await deleteOpportunityAction(opp.id);
      if ("error" in res) toast.error(res.error);
      else { toast.success("Deleted."); onClose(); }
    });
  }

  return (
    <Sheet open={!!opp} onOpenChange={(o) => { if (!o) onClose(); }}>
      <SheetContent className="flex flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="pr-8 text-base">{opp?.title ?? ""}</SheetTitle>
          {opp ? (
            <SheetDescription className="flex flex-wrap items-center gap-2">
              {opp.contactName ? <span>{opp.contactName}</span> : null}
              {opp.contactHandle ? <span>{opp.contactHandle}</span> : null}
              {opp.sourcePlatform ? <PipelinePlatformPill platform={opp.sourcePlatform} /> : null}
            </SheetDescription>
          ) : null}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Notes</label>
          <textarea
            key={opp?.id}
            defaultValue={opp?.notes ?? ""}
            rows={10}
            placeholder="Add context, links, terms…"
            onBlur={(e) => saveNotes(e.target.value)}
            className="w-full rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
          <p className="mt-1 text-[11px] text-muted-foreground">Saves on blur.</p>
        </div>
        <div className="flex justify-end border-t p-3">
          <Button variant="destructive" onClick={onDelete} disabled={pending}>
            {pending ? <Spinner aria-hidden /> : <Trash2 className="size-4" />}
            Delete
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
