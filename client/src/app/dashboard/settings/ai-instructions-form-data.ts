import type { BrandKit } from "@/lib/content/platform-instructions.types";
import { normalizeHex } from "@/lib/content/normalize-hex";

const TEXT_KEYS = [
  "whoIAm", "whatIDo", "goals", "interests",
  "postTypes", "tone", "visualStyle", "extraNotes",
];

// Each form submits only its own scope (shared brief vs one platform), so the
// body carries exactly the keys that were on screen.
export function buildInstructionsBody(fd: FormData): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  for (const key of TEXT_KEYS) if (fd.has(key)) body[key] = str(fd, key);
  if (fd.has("bkPrimary")) body.brandKit = readBrandKit(fd);
  return body;
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

// "1A1A1A", "#fff" and friends become "#1A1A1A"; the form blocks anything else.
function hex(fd: FormData, key: string): string | undefined {
  return normalizeHex(str(fd, key)) || undefined;
}

function font(fd: FormData, key: string): string | undefined {
  const v = str(fd, key);
  return v ? v.slice(0, 60) : undefined;
}

function readBrandKit(fd: FormData): BrandKit {
  const kit: Record<string, string | undefined> = {
    primary: hex(fd, "bkPrimary"), secondary: hex(fd, "bkSecondary"),
    accent: hex(fd, "bkAccent"), background: hex(fd, "bkBackground"),
    text: hex(fd, "bkText"),
    headingFont: font(fd, "bkHeadingFont"), bodyFont: font(fd, "bkBodyFont"),
    logoUrl: str(fd, "bkLogoUrl") || undefined,
    logoPlacement: str(fd, "bkLogoPlacement") || undefined,
  };
  return {
    ...Object.fromEntries(Object.entries(kit).filter(([, v]) => v)),
    // Sent unconditionally: an unchecked box submits nothing, and dropping the
    // key would leave the old value in place so the toggle could never be
    // turned back off.
    logoOnImages: fd.get("bkLogoOnImages") === "on",
  } as BrandKit;
}
