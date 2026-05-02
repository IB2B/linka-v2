"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { createPipelineAction } from "@/app/dashboard/pipeline/pipeline-actions";
import { NewPipelineStages } from "./new-pipeline-stages";
import type { StageDraft } from "./new-pipeline-stages";

export function NewPipelineDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [stages, setStages] = useState<StageDraft[]>([]);
  const [pending, start] = useTransition();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const cleaned = stages
      .map((s) => ({ name: s.name.trim(), outcome: s.outcome }))
      .filter((s) => s.name.length > 0);
    start(async () => {
      const r = await createPipelineAction({ name: trimmed, stages: cleaned });
      if ("error" in r) toast.error(r.error);
      else {
        toast.success("Pipeline created.");
        setName(""); setStages([]); setOpen(false);
        router.push(`/dashboard/pipeline?pipelineId=${r.id}`);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Plus className="size-3.5" /> New pipeline
      </Button>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-base">New pipeline</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-3 px-4 pb-4">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={120}
            placeholder="Pipeline name"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
          <NewPipelineStages stages={stages} onChange={setStages} />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending || !name.trim()}>
              {pending ? <Spinner aria-hidden /> : null}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
