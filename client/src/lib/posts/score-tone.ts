export type ScoreTone = { ring: string; text: string; badge: string; label: string };

// Shared virality-score color bands, used by the detail meter and the card badge.
export function scoreTone(score: number): ScoreTone {
  if (score >= 75) {
    return { ring: "stroke-emerald-500", text: "text-emerald-500",
      badge: "bg-emerald-500/10 text-emerald-600", label: "Strong" };
  }
  if (score >= 50) {
    return { ring: "stroke-amber-500", text: "text-amber-500",
      badge: "bg-amber-500/10 text-amber-600", label: "Decent" };
  }
  return { ring: "stroke-rose-500", text: "text-rose-500",
    badge: "bg-rose-500/10 text-rose-600", label: "Weak" };
}
