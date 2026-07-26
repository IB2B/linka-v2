import type { PlatformInstructionsRow } from "../models/platform-instructions.model";

// Renders the user's per-platform brand brief into a prompt block that layers
// on top of POST_SYSTEM and the Voice Lab guidance. Empty briefs return "".
export function buildBrief(row: PlatformInstructionsRow | null): string {
  if (!row) return "";
  const parts: string[] = [];
  const add = (label: string, v: string | null | undefined) => {
    if (v && v.trim()) parts.push(`${label}: ${v.trim()}`);
  };
  add("Who they are", row.who_i_am);
  add("What they do", row.what_i_do);
  add("Their goal", row.goals);
  add("People, companies & topics they follow", row.interests);
  add("Types of posts they want", row.post_types);
  add("Tone of voice", row.tone);
  add("Visual style", row.visual_style);
  add("Extra notes", row.extra_notes);
  const links = (row.competitor_links ?? []).filter(Boolean);
  if (links.length) {
    parts.push(`Accounts they admire and want to emulate: ${links.join(", ")}`);
  }
  if (!parts.length) return "";
  return `\nUser's brand brief for this platform — follow it closely:\n- ${parts.join("\n- ")}`;
}
