import type { AvatarAspect, AvatarSeconds } from "@/types/avatar-video";

export const ASPECT_CHOICES: readonly { value: AvatarAspect; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "4:5", label: "4:5" },
  { value: "9:16", label: "9:16" },
  { value: "16:9", label: "16:9" },
  { value: "1:1", label: "1:1" },
];

export const LENGTH_CHOICES: readonly { value: AvatarSeconds; label: string }[] = [
  { value: 30, label: "30s" },
  { value: 60, label: "1 min" },
  { value: 120, label: "2 min" },
];
