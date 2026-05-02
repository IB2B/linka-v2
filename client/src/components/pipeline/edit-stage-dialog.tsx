"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { updateStageAction } from "@/app/dashboard/pipeline/stage-actions";
import type { Stage } from "@/types/pipeline";

type Props = {
  stage: Stage;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function EditStageDialog({ stage, open, onOpenChange }: Props) {
  const [name, setName] = useState(stage.name);
  const [pending, start] = useTransition();

  useEffect(() => { if (open) setName(stage.name); }, [open, stage.name]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    start(async () => {
      const r = await updateStageAction(stage.id, { name: trimmed });
      if ("error" in r) toast.error(r.error);
      else { toast.success("Stage renamed."); onOpenChange(false); }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-base">Rename stage</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-3 px-4 pb-4">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending || !name.trim()}>
              {pending ? <Spinner aria-hidden /> : null}
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
