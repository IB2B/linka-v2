"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { PipelineList, StagePicker } from "./pipeline-picker";
import { getPipelinesAction, addToPipelineAction } from "@/app/dashboard/inbox/pipeline-actions";

type Pipeline = { id: string; name: string; stages: { id: string; name: string }[] };
type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  contact: { name: string; handle: string | null; platform: string };
};

export function AddToPipelineDialog({ open, onOpenChange, contact }: Props) {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [selected, setSelected] = useState<Pipeline | null>(null);
  const [loading, setLoading] = useState(false);
  const [pending, start] = useTransition();

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setSelected(null);
    getPipelinesAction().then((r) => {
      if ("error" in r) { toast.error(r.error); return; }
      setPipelines(r.pipelines);
      if (r.pipelines.length === 1) setSelected(r.pipelines[0]);
    }).finally(() => setLoading(false));
  }, [open]);

  function pick(stageId: string) {
    start(async () => {
      const r = await addToPipelineAction(stageId, contact);
      if ("error" in r) { toast.error(r.error); return; }
      toast.success(`${contact.name} added to pipeline`);
      onOpenChange(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>Add to pipeline</DialogTitle></DialogHeader>
        {loading ? (
          <div className="flex justify-center py-6"><Spinner /></div>
        ) : !selected ? (
          <PipelineList pipelines={pipelines} onSelect={setSelected} />
        ) : (
          <StagePicker
            pipeline={selected}
            onBack={() => setSelected(null)}
            onPick={pick}
            pending={pending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
