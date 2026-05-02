"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { SAMPLE_SOURCES } from "@/lib/voice-lab/sources";
import { SampleRowActions } from "./sample-row-actions";
import { SampleViewDialog } from "./sample-view-dialog";
import type { WritingSample } from "@/types/voice-lab";

type Props = {
  sample: WritingSample;
  selected: boolean;
  onToggle: () => void;
};

export function SampleRow({ sample, selected, onToggle }: Props) {
  const [open, setOpen] = useState(false);
  const sourceLabel =
    SAMPLE_SOURCES.find((s) => s.value === sample.source)?.label ?? sample.source;
  const preview =
    sample.content.slice(0, 140) + (sample.content.length > 140 ? "…" : "");
  const title = sample.title || "Untitled sample";
  const wc = sample.wordCount;
  const wcClass =
    wc < 100
      ? "text-red-600"
      : wc < 300
        ? "text-amber-600"
        : "text-emerald-600";

  return (
    <>
      <div
        data-selected={selected}
        className="space-y-2 rounded-md border p-3 transition-colors data-[selected=true]:border-emerald-500 data-[selected=true]:bg-emerald-500/10 data-[selected=true]:ring-1 data-[selected=true]:ring-emerald-500/40"
      >
        <div className="flex items-start gap-3">
          <Checkbox
            checked={selected}
            onCheckedChange={onToggle}
            aria-label="Select sample"
            className="mt-1"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant="outline">{sourceLabel}</Badge>
              {sample.processedAt ? (
                <Badge className="bg-emerald-500/15 text-emerald-700">
                  Analyzed
                </Badge>
              ) : (
                <Badge className="bg-amber-500/15 text-amber-700">
                  Pending
                </Badge>
              )}
              <span className={`text-xs font-medium ${wcClass}`}>
                {wc} words
              </span>
            </div>
          </div>
          <SampleRowActions sample={sample} onView={() => setOpen(true)} />
        </div>
        <p className="line-clamp-2 pl-7 text-sm text-muted-foreground">
          {preview}
        </p>
      </div>
      <SampleViewDialog sample={sample} open={open} onOpenChange={setOpen} />
    </>
  );
}
