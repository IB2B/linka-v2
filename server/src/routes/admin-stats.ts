import { Router } from "express";
import { db } from "../lib/db";
import { adminOnly } from "../middleware/admin";

const router = Router();
router.use(adminOnly);

router.get("/", async (_req, res, next) => {
  try {
    const [[u]] = await db.query<any[]>(
      `SELECT
         COUNT(*)                                         AS total,
         SUM(status='ACTIVE')                             AS active,
         SUM(status='SUSPENDED')                          AS suspended,
         SUM(created_at >= NOW() - INTERVAL 7 DAY)        AS new_week
       FROM users`,
    );
    const [[p]] = await db.query<any[]>(
      `SELECT
         COUNT(*) AS total,
         SUM(created_at >= NOW() - INTERVAL 30 DAY) AS month
       FROM generated_content`,
    );
    const [[s]] = await db.query<any[]>(
      `SELECT
         SUM(status='active' AND plan_tier <> 'free') AS paying,
         SUM(plan_tier='free' OR plan_tier IS NULL)   AS free
       FROM subscriptions`,
    );
    const [[t]] = await db.query<any[]>(
      `SELECT SUM(status='open') AS open_tickets FROM support_tickets`,
    );
    res.json({
      users: {
        total: Number(u.total ?? 0),
        active: Number(u.active ?? 0),
        suspended: Number(u.suspended ?? 0),
        newThisWeek: Number(u.new_week ?? 0),
      },
      posts: {
        total: Number(p.total ?? 0),
        thisMonth: Number(p.month ?? 0),
      },
      subscriptions: {
        paying: Number(s?.paying ?? 0),
        free: Number(s?.free ?? 0),
      },
      tickets: { open: Number(t?.open_tickets ?? 0) },
    });
  } catch (e) { next(e); }
});

export default router;
