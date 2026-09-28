import { getMonthlyUsage } from "./posts-monthly-usage";
import { isPaidTier } from "./plan-features";

export type GuardError = { status: number; code: string; error: string };

export const isVideoMedia = (media: string) => media === "video" || media === "avatar";

// Checked before any AI call: enough posts left for every platform asked for
// (each platform draft is one post), and for video a paid plan with enough of
// the monthly video quota left — video is by far the most expensive media.
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
  if (!isVideoMedia(media)) return null;
  if (!isPaidTier(usage.tier) || usage.videosLimit <= 0) {
    return {
      status: 403, code: "VIDEO_REQUIRES_PAID",
      error: "Video is included from the Creator plan. Upgrade, or pick Image or Text only.",
    };
  }
  // Each platform renders its own video, so each one uses a video.
  const videosLeft = usage.videosLimit - usage.videosUsed;
  if (videosLeft < platformCount) {
    return {
      status: 403, code: "VIDEO_LIMIT_REACHED",
      error: `Need ${platformCount} video${platformCount === 1 ? "" : "s"} but only ${Math.max(0, videosLeft)} left this month (${usage.videosUsed}/${usage.videosLimit}). Pick Image or Text only, or upgrade.`,
    };
  }
  return null;
}
