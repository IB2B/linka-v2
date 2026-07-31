import { getForPlatform } from "../models/platform-instructions.model";
import type { LogoOverlay } from "./image-watermark";

// The mark to stamp on a generated image, or null when the user has not set
// one or has the toggle off. Lives inside the brand_kit JSON, so adding it
// needed no migration.
export async function brandLogoFor(
  userId: string, platform: string,
): Promise<LogoOverlay | null> {
  const row = await getForPlatform(userId, platform).catch(() => null);
  const kit = row?.brand_kit;
  if (!kit?.logoUrl || !kit.logoOnImages) return null;
  return { url: kit.logoUrl, placement: kit.logoPlacement ?? "bottom_right" };
}
