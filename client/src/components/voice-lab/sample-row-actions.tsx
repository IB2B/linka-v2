"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Eye, Download, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { downloadSample } from "@/lib/voice-lab/download-sample";
import {
  analyzeAction,
  deleteSampleAction,
} from "@/app/dashboard/voice-lab/actions";
import type { WritingSample } from "@/types/voice-lab";

type Props = { sample: WritingSample; onView: () => void };

export function SampleRowActions({ sample, onView }: Props) {
  const [delPending, delStart] = useTransition();
  const [anaPending, anaStart] = useTransition();

  function onDelete() {
    delStart(async () => {
      const res = await deleteSampleAction(sample.id);
      if (res.error) toast.error(res.error);
      else toast.success("Sample deleted.");
    });
  }
  function onAnalyze() {
    anaStart(async () => {
      toast.info("Analyzing sample…");
      const res = await analyzeAction([sample.id]);
      if (res.error) toast.error(res.error);
      else toast.success("Voice DNA updated.");
    });
  }

  const btn = "size-4";
  const view = "hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400";
  const dl = "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400";
  const ana = "hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400";
  const del = "hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400";
  return (
    <div className="flex shrink-0 gap-1">
      <Button size="icon-sm" variant="ghost" onClick={onView} aria-label="View" className={view}>
        <Eye className={btn} />
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={() => downloadSample(sample)} aria-label="Download" className={dl}>
        <Download className={btn} />
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={onAnalyze} disabled={anaPending} aria-label="Analyze" className={ana}>
        {anaPending ? <Spinner /> : <Sparkles className={btn} />}
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={onDelete} disabled={delPending} aria-label="Delete" className={del}>
        <Trash2 className={btn} />
      </Button>
    </div>
  );
}
