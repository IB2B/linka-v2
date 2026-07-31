"use client";

import { Label } from "@/components/ui/label";
import { SegmentedChoice } from "./segmented-choice";
import { SHAPE_CHOICES } from "./image-choices";
import type { ImageShape } from "@/types/image-shape";

type Props = {
  shape: ImageShape;
  onShapeChange: (next: ImageShape) => void;
  disabled?: boolean;
};

export function ImageOptions({ shape, onShapeChange, disabled }: Props) {
  return (
    <div className="space-y-1.5 rounded-lg border bg-muted/30 p-3">
      <Label className="text-xs text-muted-foreground">Shape</Label>
      <SegmentedChoice label="Shape" value={shape} choices={SHAPE_CHOICES}
        onChange={onShapeChange} disabled={disabled} />
      <p className="text-xs text-muted-foreground">
        Portrait is 2:3 — the image generator can&apos;t do a feed-native 4:5.
      </p>
    </div>
  );
}
