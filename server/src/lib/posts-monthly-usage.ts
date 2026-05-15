import { db } from "./db";
import { postsLimitFor } from "./plan-features";

export type MonthlyUsage = { tier: string; used: number; limit: number };

export async function getMonthlyUsage(userId: string): Promise<MonthlyUsage> {
  const [usageRes, subRes] = await Promise.all([
    db.query<any[]>(
      `SELECT COUNT(*) AS n FROM generated_content
         WHERE user_id = ?
           AND created_at >= DATE_FORMAT(NOW(), '%Y-%m-01 00:00:00')`,
      [userId],
    ),
    db.query<any[]>(
      "SELECT plan_tier FROM subscriptions WHERE user_id = ?", [userId],
    ),
  ]);
  const used = Number(usageRes[0][0]?.n ?? 0);
  const tier = String(subRes[0][0]?.plan_tier ?? "free").toLowerCase();
  return { tier, used, limit: postsLimitFor(tier) };
}
