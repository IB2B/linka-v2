// OpenAI's Images API offers three shapes only, and the exact pixel sizes differ
// per model family. Callers pick a shape and this maps it, so no caller has to
// know which model is configured.
//
// Feed-native 4:5 and 9:16 are NOT available from this API — the closest portrait
// is 2:3 — which is why the UI names these by shape instead of promising a ratio.
export type ImageShape = "square" | "portrait" | "landscape";

const GPT_IMAGE: Record<ImageShape, string> = {
  square: "1024x1024",
  portrait: "1024x1536",
  landscape: "1536x1024",
};

const DALLE: Record<ImageShape, string> = {
  square: "1024x1024",
  portrait: "1024x1792",
  landscape: "1792x1024",
};

export const IMAGE_SHAPES: ImageShape[] = ["square", "portrait", "landscape"];

export function imageSizeFor(shape: ImageShape, model: string): string {
  const table = model.startsWith("gpt-image") ? GPT_IMAGE : DALLE;
  return table[shape];
}

export function asImageShape(v: unknown): ImageShape | undefined {
  return IMAGE_SHAPES.includes(v as ImageShape) ? (v as ImageShape) : undefined;
}
