import type { PlatformInstructionsRow } from "../models/platform-instructions.types";

// Pseudo-platform holding the brief the user writes once for every platform.
export const GLOBAL_PLATFORM = "global";

function isEmpty(v: unknown): boolean {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return !v.trim();
  if (Array.isArray(v)) return !v.length;
  return typeof v === "object" && !Object.keys(v as object).length;
}

// The global row is the base; a platform row overrides only what it fills in.
export function mergeInstructions(
  base: PlatformInstructionsRow | null,
  override: PlatformInstructionsRow | null,
): PlatformInstructionsRow | null {
  if (!base) return override;
  if (!override) return base;
  const merged: Record<string, unknown> = { ...base, platform: override.platform };
  for (const [key, value] of Object.entries(override)) {
    if (key !== "platform" && !isEmpty(value)) merged[key] = value;
  }
  return merged as PlatformInstructionsRow;
}
