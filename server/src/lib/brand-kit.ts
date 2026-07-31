export type LogoPlacement =
  | "top_left" | "top_right" | "bottom_left" | "bottom_right";

export type BrandKit = {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
  headingFont?: string;
  bodyFont?: string;
  // Stamped onto the finished picture, never described in the prompt — image
  // models draw logos as garbled pseudo-text.
  logoUrl?: string;
  logoOnImages?: boolean;
  logoPlacement?: LogoPlacement;
};

const COLOUR_KEYS: [keyof BrandKit, string][] = [
  ["primary", "primary"], ["secondary", "secondary"], ["accent", "accent"],
  ["background", "background"], ["text", "text colour"],
];

function safeJson(s: string): unknown {
  try { return JSON.parse(s); } catch { return null; }
}

export function parseBrandKit(raw: unknown): BrandKit | null {
  if (!raw) return null;
  const v = typeof raw === "string" ? safeJson(raw) : raw;
  return v && typeof v === "object" ? (v as BrandKit) : null;
}

// Colours only. Fonts are intentionally excluded from photo prompts: a
// photograph carries no text, and naming a font risks the model rendering it.
export function paletteLine(kit: BrandKit | null): string {
  if (!kit) return "";
  const parts = COLOUR_KEYS
    .filter(([k]) => typeof kit[k] === "string" && kit[k])
    .map(([k, label]) => `${label} ${kit[k]}`);
  return parts.length
    ? `Base the image on this exact brand colour palette: ${parts.join(", ")}.`
    : "";
}
