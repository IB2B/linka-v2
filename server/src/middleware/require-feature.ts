import type { Response, NextFunction } from "express";
import { db } from "../lib/db";
import { hasBusinessFeature } from "../lib/plan-features";
import { type AuthRequest } from "./auth";

export async function requireBusinessFeature(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const [rows] = await db.query<any[]>(
      "SELECT plan_tier FROM subscriptions WHERE user_id = ?",
      [req.user!.id],
    );
    const tier = String(rows[0]?.plan_tier ?? "free").toLowerCase();
    if (!hasBusinessFeature(tier)) {
      res.status(403).json({ error: "This feature requires the Business plan." });
      return;
    }
    next();
  } catch (e) { next(e); }
}
