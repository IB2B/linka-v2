import { db } from "./db";
import { postsLimitFor } from "./plan-features";
import { countPostsThisMonth } from "./posts-month-count";

export type MonthlyUsage = { tier: string; used: number; limit: number };

export async function getMonthlyUsage(userId: string): Promise<MonthlyUsage> {
  const [used, subRes] = await Promise.all([
    countPostsThisMonth(userId),
    db.query<any[]>(
      "SELECT plan_tier FROM subscriptions WHERE user_id = ?", [userId],
    ),
  ]);
  const tier = String(subRes[0][0]?.plan_tier ?? "free").toLowerCase();
  return { tier, used, limit: postsLimitFor(tier) };
}
