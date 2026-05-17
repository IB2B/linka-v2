"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Opportunity, UpdateOppInput, SocialKey } from "@/types/pipeline";
import { deleteOpportunityAction, updateOpportunityAction } from "@/app/dashboard/pipeline/actions";
import { PipelinePlatformPill } from "./pipeline-platform-pill";
import { OppSocialLinks } from "./opp-social-links";
import { OppMeta } from "./opp-meta";

type Props = { opp: Opportunity | null; onClose: () => void; onDeleted?: (id: string) => void };

export function OpportunityDetailSheet({ opp, onClose, onDeleted }: Props) {
  const [pending, start] = useTransition();

  function save(input: UpdateOppInput) {
    if (!opp) return;
    start(async () => {
      const res = await updateOpportunityAction(opp.id, input);
      if ("error" in res) toast.error(res.error);
      else toast.success("Saved.");
    });
  }

  function handleDelete() {
    if (!opp) return;
    start(async () => {
      const res = await deleteOpportunityAction(opp.id);
      if ("error" in res) { toast.error(res.error); return; }
      toast.success("Deleted.");
      onDeleted?.(opp.id);
      onClose();
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
              {opp.sourcePlatform ? <PipelinePlatformPill platform={opp.sourcePlatform} /> : null}
            </SheetDescription>
          ) : null}
        </SheetHeader>
        <div className="flex flex-col flex-1 gap-4 overflow-y-auto p-4">
          {opp ? <OppMeta opp={opp} /> : null}
          {opp ? (
            <OppSocialLinks opp={opp} disabled={pending}
              onSave={(k: SocialKey, url) => save({ [k]: url })} />
          ) : null}
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Notes</p>
            <textarea key={opp?.id} defaultValue={opp?.notes ?? ""} rows={5}
              placeholder="Add context, links, terms…"
              onBlur={(e) => save({ notes: e.target.value })}
              className="w-full resize-none rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
          </div>
        </div>
        <div className="flex justify-end border-t p-3">
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>
            {pending ? <Spinner aria-hidden /> : <Trash2 className="size-4" />}
            Delete
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
