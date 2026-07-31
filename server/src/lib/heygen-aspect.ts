export type Aspect = "16:9" | "9:16" | "4:5" | "1:1" | "auto";

const ASPECTS: Aspect[] = ["16:9", "9:16", "4:5", "1:1"];

// Omitting aspect_ratio no longer renders a look at its native framing —
// HeyGen started defaulting the field to 16:9, so leaving it out silently
// letterboxes every portrait avatar. "auto" is the explicit match-the-source
// value and is what the UI's Auto choice has to send.
export function aspectFor(override?: string | null): Aspect {
  if (override && ASPECTS.includes(override as Aspect)) return override as Aspect;
  return "auto";
}
