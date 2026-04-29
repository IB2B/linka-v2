import type { WritingSample } from "@/types/voice-lab";

function safeFilename(name: string): string {
  return name.replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "") || "sample";
}

export function downloadSample(sample: WritingSample): void {
  const base = safeFilename(sample.title || `sample-${sample.id.slice(0, 8)}`);
  const blob = new Blob([sample.content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${base}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
