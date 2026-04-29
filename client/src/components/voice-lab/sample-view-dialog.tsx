"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_SOURCES } from "@/lib/voice-lab/sources";
import type { WritingSample } from "@/types/voice-lab";

type Props = {
  sample: WritingSample;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SampleViewDialog({ sample, open, onOpenChange }: Props) {
  const sourceLabel =
    SAMPLE_SOURCES.find((s) => s.value === sample.source)?.label ?? sample.source;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{sample.title || "Untitled sample"}</DialogTitle>
          <DialogDescription>
            <span className="inline-flex items-center gap-2">
              <Badge variant="outline">{sourceLabel}</Badge>
              <span>{sample.wordCount} words</span>
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap rounded-md border bg-muted/30 p-4 text-sm leading-relaxed">
          {sample.content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
