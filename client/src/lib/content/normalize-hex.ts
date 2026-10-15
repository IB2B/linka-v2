// Accepts the ways people actually write colours — "1A1A1A" (Figma, Canva and
// brand guides drop the #), "#1a1a1a", "#FFF", pasted with spaces — and returns
// "#1A1A1A". Returns "" for anything that isn't a hex colour.
export function normalizeHex(input: string): string {
  const v = input.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(v)) return `#${[...v].map((c) => c + c).join("")}`.toUpperCase();
  if (/^[0-9a-f]{6}$/i.test(v)) return `#${v}`.toUpperCase();
  return "";
}
