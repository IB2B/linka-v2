"use client";

import { Label } from "@/components/ui/label";
import { SegmentedChoice } from "./segmented-choice";
import { ASPECT_CHOICES, LENGTH_CHOICES } from "./avatar-choices";
import type { AvatarAspect, AvatarSeconds } from "@/types/avatar-video";

type Props = {
  aspect: AvatarAspect;
  seconds: AvatarSeconds;
  onAspectChange: (next: AvatarAspect) => void;
  onSecondsChange: (next: AvatarSeconds) => void;
  disabled?: boolean;
};

export function AvatarVideoOptions({
  aspect, seconds, onAspectChange, onSecondsChange, disabled,
}: Props) {
  return (
    <div className="space-y-3 rounded-lg border bg-muted/30 p-3">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Framing</Label>
        <SegmentedChoice label="Framing" value={aspect} choices={ASPECT_CHOICES}
          onChange={onAspectChange} disabled={disabled} />
        <p className="text-xs text-muted-foreground">
          Auto keeps the avatar&apos;s own framing. Forcing a ratio the avatar
          wasn&apos;t shot in adds bars to fill the frame.
        </p>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Length</Label>
        <SegmentedChoice label="Length" value={seconds} choices={LENGTH_CHOICES}
          onChange={onSecondsChange} disabled={disabled} />
        <p className="text-xs text-muted-foreground">
          Approximate — the script is written to this length. Longer videos cost
          proportionally more to render.
        </p>
      </div>
    </div>
  );
}
