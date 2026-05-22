"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Eye, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { downloadSample } from "@/lib/voice-lab/download-sample";
import { deleteSampleAction } from "@/app/dashboard/voice-lab/actions";
import type { WritingSample } from "@/types/voice-lab";

type Props = { sample: WritingSample; onView: () => void };

export function SampleRowActions({ sample, onView }: Props) {
  const [delPending, delStart] = useTransition();

  function onDelete() {
    delStart(async () => {
      const res = await deleteSampleAction(sample.id);
      if (res.error) toast.error(res.error);
      else toast.success("Sample deleted.");
    });
  }

  const btn = "size-4";
  const view = "hover:bg-sky-500/10 hover:text-sky-600";
  const dl = "hover:bg-indigo-500/10 hover:text-indigo-600";
  const del = "hover:bg-red-500/10 hover:text-red-600";
  return (
    <div className="flex shrink-0 gap-1">
      <Button size="icon-sm" variant="ghost" onClick={onView} aria-label="View" className={view}>
        <Eye className={btn} />
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={() => downloadSample(sample)} aria-label="Download" className={dl}>
        <Download className={btn} />
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={onDelete} disabled={delPending} aria-label="Delete" className={del}>
        {delPending ? <Spinner /> : <Trash2 className={btn} />}
      </Button>
    </div>
  );
}
