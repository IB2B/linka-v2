import { getMonthlyUsage } from "./posts-monthly-usage";
import { isPaidTier } from "./plan-features";
import { checkImageRateLimit, IMAGE_MAX_PER_DAY } from "./image-rate-limiter";
import { checkVideoRateLimit, VIDEO_MAX_PER_DAY } from "./video-rate-limiter";

export type UsageSummary = {
  tier: string;
  posts: { used: number; limit: number; resetsAt: string };
  images: { used: number; limit: number };
  videos: { used: number; limit: number; allowed: boolean };
};

function firstOfNextMonth(): string {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth() + 1, 1).toISOString();
}

// What the user can still generate: the monthly post allowance (each platform
// draft counts as one; regenerating text does not), plus the daily image and
// video caps, which regenerations do count against.
export async function getUsageSummary(userId: string): Promise<UsageSummary> {
  const usage = await getMonthlyUsage(userId);
  const images = checkImageRateLimit(userId);
  const videos = checkVideoRateLimit(userId);
  return {
    tier: usage.tier,
    posts: { used: usage.used, limit: usage.limit, resetsAt: firstOfNextMonth() },
    images: { used: IMAGE_MAX_PER_DAY - images.remaining, limit: IMAGE_MAX_PER_DAY },
    videos: {
      used: VIDEO_MAX_PER_DAY - videos.remaining,
      limit: VIDEO_MAX_PER_DAY,
      allowed: isPaidTier(usage.tier),
    },
  };
}
