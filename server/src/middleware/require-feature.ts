import type { Response, NextFunction } from "express";
import { db } from "../lib/db";
import { hasBusinessFeature } from "../lib/plan-features";
import { effectiveTier } from "../lib/comp-accounts";
import { type AuthRequest } from "./auth";

export async function requireBusinessFeature(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const [rows] = await db.query<any[]>(
      `SELECT u.email, u.email_verified_at, s.plan_tier FROM users u
         LEFT JOIN subscriptions s ON s.user_id = u.id
       WHERE u.id = ?`,
      [req.user!.id],
    );
    const tier = effectiveTier(
      rows[0]?.email, rows[0]?.plan_tier, rows[0]?.email_verified_at != null,
    );
    if (!hasBusinessFeature(tier)) {
      res.status(403).json({ error: "This feature requires the Business plan." });
      return;
    }
    next();
  } catch (e) { next(e); }
}
