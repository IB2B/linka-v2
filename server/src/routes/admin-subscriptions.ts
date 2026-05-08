import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { listSubscriptions } from "../lib/admin-subscriptions";
import { getSubscriptionsSummary } from "../lib/admin-subscriptions-summary";

const router = Router();
router.use(adminOnly);

router.get("/", async (req, res, next) => {
  try {
    const q = String(req.query.q ?? "").trim() || undefined;
    const tier = typeof req.query.tier === "string" ? req.query.tier : undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const limit = Math.min(Number(req.query.limit ?? 50), 200);
    const offset = Math.max(Number(req.query.offset ?? 0), 0);
    const [list, summary] = await Promise.all([
      listSubscriptions({ q, tier, status, limit, offset }),
      getSubscriptionsSummary(),
    ]);
    res.json({ ...list, summary });
  } catch (e) { next(e); }
});

export default router;
