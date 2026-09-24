import { getMonthlyUsage } from "./posts-monthly-usage";
import { isPaidTier } from "./plan-features";

export type GuardError = { status: number; code: string; error: string };

export const isVideoMedia = (media: string) => media === "video" || media === "avatar";

// Checked before any AI call: enough posts left for every platform asked for
// (each platform draft is one post), and video only on a paid plan — it is by
// far the most expensive media, and the pricing page sells it from Creator up.
export async function checkGenerateAllowed(
  userId: string, platformCount: number, media: string,
): Promise<GuardError | null> {
  const usage = await getMonthlyUsage(userId);
  const remaining = usage.limit - usage.used;
  if (remaining < platformCount) {
    return {
      status: 403, code: "POST_LIMIT_REACHED",
      error: `Need ${platformCount} posts but only ${remaining} left (${usage.used}/${usage.limit}). Upgrade to keep generating.`,
    };
  }
  if (isVideoMedia(media) && !isPaidTier(usage.tier)) {
    return {
      status: 403, code: "VIDEO_REQUIRES_PAID",
      error: "Video is included from the Creator plan. Upgrade, or pick Image or Text only.",
    };
  }
  return null;
}
