import { db } from "./db";
import { postsLimitFor } from "./plan-features";
import { effectiveTier } from "./comp-accounts";
import { countPostsThisMonth } from "./posts-month-count";

export type MonthlyUsage = { tier: string; used: number; limit: number };

export async function getMonthlyUsage(userId: string): Promise<MonthlyUsage> {
  const [used, subRes] = await Promise.all([
    countPostsThisMonth(userId),
    db.query<any[]>(
      `SELECT u.email, u.email_verified_at, s.plan_tier FROM users u
         LEFT JOIN subscriptions s ON s.user_id = u.id
       WHERE u.id = ?`, [userId],
    ),
  ]);
  const row = subRes[0][0];
  const tier = effectiveTier(row?.email, row?.plan_tier, row?.email_verified_at != null);
  return { tier, used, limit: postsLimitFor(tier) };
}
