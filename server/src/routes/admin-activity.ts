import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { fetchActivity } from "../lib/admin-activity";
import { fetchActivitySummary } from "../lib/admin-activity-summary";

const router = Router();
router.use(adminOnly);

router.get("/summary", async (_req, res, next) => {
  try {
    res.json(await fetchActivitySummary());
  } catch (e) { next(e); }
});

router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit ?? 100), 1), 200);
    const type = typeof req.query.type === "string" ? req.query.type : undefined;
    const events = await fetchActivity(limit, type);
    res.json({ events });
  } catch (e) { next(e); }
});

export default router;
