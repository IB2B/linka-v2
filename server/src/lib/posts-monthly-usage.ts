import { db } from "./db";
import { postsLimitFor, videosLimitFor } from "./plan-features";
import { effectiveTier } from "./comp-accounts";
import { countPostsThisMonth } from "./posts-month-count";
import { countVideosThisMonth } from "./video-quota";

export type MonthlyUsage = {
  tier: string; used: number; limit: number;
  videosUsed: number; videosLimit: number;
};

export async function getMonthlyUsage(userId: string): Promise<MonthlyUsage> {
  const [used, videosUsed, subRes] = await Promise.all([
    countPostsThisMonth(userId),
    countVideosThisMonth(userId),
    db.query<any[]>(
      `SELECT u.email, u.email_verified_at, s.plan_tier FROM users u
         LEFT JOIN subscriptions s ON s.user_id = u.id
       WHERE u.id = ?`, [userId],
    ),
  ]);
  const row = subRes[0][0];
  const tier = effectiveTier(row?.email, row?.plan_tier, row?.email_verified_at != null);
  return {
    tier, used, limit: postsLimitFor(tier),
    videosUsed, videosLimit: videosLimitFor(tier),
  };
}
