import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { listSubscriptions } from "../lib/admin-subscriptions";
import { getSubscriptionsSummary } from "../lib/admin-subscriptions-summary";

const router = Router();
router.use(adminOnly);

router.get("/", async (req, res, next) => {
  try {
    const q = String(req.query.q ?? "").trim() || undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const from = typeof req.query.from === "string" ? req.query.from : undefined;
    const to = typeof req.query.to === "string" ? req.query.to : undefined;
    const [list, summary] = await Promise.all([
      listSubscriptions({ q, status, from, to }),
      getSubscriptionsSummary(),
    ]);
    res.json({ ...list, summary });
  } catch (e) { next(e); }
});

export default router;
