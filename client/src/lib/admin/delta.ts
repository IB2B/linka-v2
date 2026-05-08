import type { ActivityWindow } from "@/types/admin";

export type Delta = {
  text: string;
  direction: "up" | "down" | "flat";
  tone: "good" | "bad" | "muted";
};

type Polarity = "up-good" | "up-bad";

export function computeDelta(w: ActivityWindow, polarity: Polarity = "up-good"): Delta {
  if (w.prev === 0 && w.curr === 0) {
    return { text: "—", direction: "flat", tone: "muted" };
  }
  if (w.prev === 0) {
    return { text: "new", direction: "up", tone: polarity === "up-good" ? "good" : "bad" };
  }
  const pct = ((w.curr - w.prev) / w.prev) * 100;
  const rounded = Math.round(pct);
  if (rounded === 0) return { text: "0%", direction: "flat", tone: "muted" };
  const direction = rounded > 0 ? "up" : "down";
  const goodUp = polarity === "up-good";
  const tone =
    direction === "up" ? (goodUp ? "good" : "bad") : (goodUp ? "bad" : "good");
  return { text: `${rounded > 0 ? "+" : ""}${rounded}%`, direction, tone };
}

export const DELTA_TONE: Record<Delta["tone"], string> = {
  good:  "text-emerald-600",
  bad:   "text-rose-600",
  muted: "text-muted-foreground",
};
