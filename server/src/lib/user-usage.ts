import { getMonthlyUsage } from "./posts-monthly-usage";
import { isPaidTier } from "./plan-features";
import { checkImageRateLimit, IMAGE_MAX_PER_DAY } from "./image-rate-limiter";

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

// What the user can still generate: the monthly post and video allowances
// (each platform draft counts as one post; regenerating text does not, but
// re-rendering a video does), plus the daily image cap.
export async function getUsageSummary(userId: string): Promise<UsageSummary> {
  const usage = await getMonthlyUsage(userId);
  const images = checkImageRateLimit(userId);
  return {
    tier: usage.tier,
    posts: { used: usage.used, limit: usage.limit, resetsAt: firstOfNextMonth() },
    images: { used: IMAGE_MAX_PER_DAY - images.remaining, limit: IMAGE_MAX_PER_DAY },
    videos: {
      used: usage.videosUsed,
      limit: usage.videosLimit,
      allowed: isPaidTier(usage.tier) && usage.videosLimit > 0,
    },
  };
}
