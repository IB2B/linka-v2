import { Router } from "express";
import { db } from "../lib/db";
import { adminOnly } from "../middleware/admin";
import { getDailySeries } from "../lib/admin-series";

const router = Router();
router.use(adminOnly);

router.get("/series", async (_req, res, next) => {
  try { res.json({ days: await getDailySeries(30) }); } catch (e) { next(e); }
});

router.get("/", async (_req, res, next) => {
  try {
    const [[u]] = await db.query<any[]>(
      `SELECT
         COUNT(*)                                  AS total,
         SUM(status='ACTIVE')                      AS active,
         SUM(status='SUSPENDED')                   AS suspended,
         SUM(created_at >= NOW() - INTERVAL 7 DAY) AS new_week,
         SUM(created_at >= NOW() - INTERVAL 14 DAY AND created_at < NOW() - INTERVAL 7 DAY) AS new_prev_week
       FROM users`,
    );
    const [[p]] = await db.query<any[]>(
      `SELECT
         COUNT(*) AS total,
         SUM(created_at >= NOW() - INTERVAL 30 DAY) AS month,
         SUM(created_at >= NOW() - INTERVAL 60 DAY AND created_at < NOW() - INTERVAL 30 DAY) AS prev_month
       FROM generated_content`,
    );
    const [[s]] = await db.query<any[]>(
      `SELECT
         SUM(status='active' AND plan_tier <> 'free') AS paying,
         SUM(plan_tier='free' OR plan_tier IS NULL)   AS free
       FROM subscriptions`,
    );
    const [[t]] = await db.query<any[]>(
      `SELECT
         SUM(status='open') AS open_count,
         SUM(status IN ('open','pending') AND priority='urgent') AS urgent_count
       FROM support_tickets`,
    );
    const [[m]] = await db.query<any[]>(
      `SELECT SUM(status='pending') AS pending FROM content_flags`,
    );
    const [[f]] = await db.query<any[]>(
      `SELECT SUM(status='new') AS new_count FROM feedback`,
    );
    res.json({
      users: {
        total: Number(u.total ?? 0),
        active: Number(u.active ?? 0),
        suspended: Number(u.suspended ?? 0),
        newThisWeek: Number(u.new_week ?? 0),
        newPrevWeek: Number(u.new_prev_week ?? 0),
      },
      posts: {
        total: Number(p.total ?? 0),
        thisMonth: Number(p.month ?? 0),
        prevMonth: Number(p.prev_month ?? 0),
      },
      subscriptions: {
        paying: Number(s?.paying ?? 0),
        free: Number(s?.free ?? 0),
      },
      tickets: {
        open: Number(t?.open_count ?? 0),
        urgent: Number(t?.urgent_count ?? 0),
      },
      moderation: { pending: Number(m?.pending ?? 0) },
      feedback: { newCount: Number(f?.new_count ?? 0) },
    });
  } catch (e) { next(e); }
});

export default router;
