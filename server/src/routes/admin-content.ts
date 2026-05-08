import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { listAdminContent } from "../lib/admin-content-list";
import { getContentSummary } from "../lib/admin-content-summary";

const router = Router();
router.use(adminOnly);

router.get("/", async (req, res, next) => {
  try {
    const q = String(req.query.q ?? "").trim() || undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const platform = typeof req.query.platform === "string" ? req.query.platform : undefined;
    const limit = Math.min(Number(req.query.limit ?? 50), 200);
    const offset = Math.max(Number(req.query.offset ?? 0), 0);
    const [list, summary] = await Promise.all([
      listAdminContent({ q, status, platform, limit, offset }),
      getContentSummary(),
    ]);
    res.json({ ...list, summary });
  } catch (e) { next(e); }
});

export default router;
