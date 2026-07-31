import type { ImageShape } from "@/types/image-shape";

export const SHAPE_CHOICES: readonly { value: ImageShape; label: string }[] = [
  { value: "landscape", label: "Landscape" },
  { value: "square", label: "Square" },
  { value: "portrait", label: "Portrait" },
];
