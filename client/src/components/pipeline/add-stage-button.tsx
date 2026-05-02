"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { createStageAction } from "@/app/dashboard/pipeline/stage-actions";

export function AddStageButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pending, start] = useTransition();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    start(async () => {
      const r = await createStageAction({ name: trimmed });
      if ("error" in r) toast.error(r.error);
      else { toast.success("Stage added."); setName(""); setOpen(false); }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Plus className="size-3.5" /> Add stage
      </Button>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-base">New stage</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-3 px-4 pb-4">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            placeholder="Stage name (e.g. Discovery)"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending || !name.trim()}>
              {pending ? <Spinner aria-hidden /> : null}
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
