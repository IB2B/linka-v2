"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Sparkles, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  analyzeAction,
  deleteSampleAction,
} from "@/app/dashboard/voice-lab/actions";

type Props = {
  selectedIds: string[];
  onClear: () => void;
};

export function SamplesToolbar({ selectedIds, onClear }: Props) {
  const [anaPending, anaStart] = useTransition();
  const [delPending, delStart] = useTransition();

  function onAnalyze() {
    anaStart(async () => {
      toast.info(`Analyzing ${selectedIds.length} samples…`);
      const res = await analyzeAction(selectedIds);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Voice DNA updated.");
        onClear();
      }
    });
  }

  function onDelete() {
    delStart(async () => {
      const results = await Promise.all(
        selectedIds.map((id) => deleteSampleAction(id)),
      );
      const failed = results.find((r) => r.error);
      if (failed) toast.error(failed.error!);
      else toast.success(`${selectedIds.length} samples deleted.`);
      onClear();
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-muted/40 px-3 py-2">
      <span className="text-sm font-medium">{selectedIds.length} selected</span>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onAnalyze} disabled={anaPending}>
          {anaPending ? <Spinner aria-hidden /> : <Sparkles className="size-4" />}
          Analyze
        </Button>
        <Button size="sm" variant="outline" onClick={onDelete} disabled={delPending}>
          {delPending ? <Spinner aria-hidden /> : <Trash2 className="size-4" />}
          Delete
        </Button>
        <Button size="sm" variant="ghost" onClick={onClear} aria-label="Clear">
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
