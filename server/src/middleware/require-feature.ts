import type { Response, NextFunction } from "express";
import { db } from "../lib/db";
import { hasProFeature } from "../lib/plan-features";
import { type AuthRequest } from "./auth";

export async function requireProFeature(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const [rows] = await db.query<any[]>(
      "SELECT plan_tier FROM subscriptions WHERE user_id = ?",
      [req.user!.id],
    );
    const tier = String(rows[0]?.plan_tier ?? "free").toLowerCase();
    if (!hasProFeature(tier)) {
      res.status(403).json({ error: "This feature requires the Pro plan." });
      return;
    }
    next();
  } catch (e) { next(e); }
}
