import { requiresTitle, titleLimitFor } from "./title-limits";
import type { PlatformEntry } from "./late-accounts";

// Zernio takes per-platform fields in platformSpecificData. Without it a YouTube
// upload is rejected outright and Reddit falls back to using the post's first
// line as the title — permanently, since Reddit titles cannot be edited after
// posting.
type Entry = PlatformEntry & { platformSpecificData?: Record<string, unknown> };

export function withPlatformData(
  platforms: PlatformEntry[], title: string | null,
): Entry[] {
  return platforms.map((p) => {
    if (!title || !requiresTitle(p.platform)) return p;
    return {
      ...p,
      platformSpecificData: { title: title.slice(0, titleLimitFor(p.platform)) },
    };
  });
}
