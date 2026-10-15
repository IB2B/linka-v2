import { db } from "./db";
import { effectiveTier } from "./comp-accounts";
import { isPaidTier } from "./plan-features";

// "Fill from site" spends a Tavily read and an AI call, outside the post quota.
export const IMPORTS_PER_DAY = { free: 3, paid: 20 } as const;

async function dailyLimit(userId: string): Promise<number> {
  const [rows] = await db.query<any[]>(
    `SELECT u.email, u.email_verified_at, s.plan_tier FROM users u
       LEFT JOIN subscriptions s ON s.user_id = u.id
     WHERE u.id = ?`, [userId],
  );
  const r = rows[0];
  const tier = effectiveTier(r?.email, r?.plan_tier, r?.email_verified_at != null);
  return isPaidTier(tier) ? IMPORTS_PER_DAY.paid : IMPORTS_PER_DAY.free;
}

// Reserve-then-count: the row is written first and counted with the others, so
// parallel requests can't all slip under the cap. Returns the reservation id to
// release on failure, or null when the cap is reached (nothing is kept).
export async function reserveImport(userId: string, url: string): Promise<{ id: number } | { limit: number }> {
  const [ins] = await db.query<any>(
    "INSERT INTO product_imports (user_id, url) VALUES (?, ?)", [userId, url.slice(0, 500)],
  );
  const id = Number(ins.insertId);
  const [[countRows], limit] = await Promise.all([
    db.query<any[]>(
      `SELECT COUNT(*) AS n FROM product_imports
       WHERE user_id = ? AND created_at >= NOW() - INTERVAL 1 DAY AND id <= ?`, [userId, id],
    ),
    dailyLimit(userId),
  ]);
  if (Number(countRows[0]?.n ?? 0) <= limit) return { id };
  await releaseImport(id);
  return { limit };
}

// A failed import doesn't cost the user one of their daily imports.
export async function releaseImport(id: number): Promise<void> {
  await db.query("DELETE FROM product_imports WHERE id = ?", [id]);
}
