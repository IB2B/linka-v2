import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { getDailySeries } from "../lib/admin-series";
import {
  getUsersRollup, getPostsRollup, getSubscriptionsRollup,
  getTicketsRollup, getFeedbackRollup, getSubscriptionsMonth,
} from "../lib/admin-overview-stats";

const router = Router();
router.use(adminOnly);

router.get("/subscriptions", async (req, res, next) => {
  try {
    const month = typeof req.query.month === "string" ? req.query.month : null;
    res.json(await getSubscriptionsMonth(month));
  } catch (e) { next(e); }
});

router.get("/series", async (_req, res, next) => {
  try { res.json({ days: await getDailySeries(30) }); } catch (e) { next(e); }
});

router.get("/", async (_req, res, next) => {
  try {
    const [users, posts, subscriptions, tickets, feedback] = await Promise.all([
      getUsersRollup(), getPostsRollup(), getSubscriptionsRollup(),
      getTicketsRollup(), getFeedbackRollup(),
    ]);
    res.json({ users, posts, subscriptions, tickets, feedback });
  } catch (e) { next(e); }
});

export default router;
