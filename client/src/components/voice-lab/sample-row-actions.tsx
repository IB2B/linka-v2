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

  return (
    <div className="flex shrink-0 gap-1">
      <Button size="icon-sm" variant="ghost" onClick={onView} aria-label="View">
        <Eye className="size-4" />
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={() => downloadSample(sample)}
        aria-label="Download"
      >
        <Download className="size-4" />
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={onAnalyze}
        disabled={anaPending}
        aria-label="Analyze"
      >
        {anaPending ? <Spinner /> : <Sparkles className="size-4" />}
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={onDelete}
        disabled={delPending}
        aria-label="Delete"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
