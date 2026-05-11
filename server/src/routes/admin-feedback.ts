import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { adminOnly } from "../middleware/admin";
import { listFeedback } from "../lib/admin-feedback-list";
import { getFeedbackSummary } from "../lib/admin-feedback-summary";

const router = Router();
router.use(adminOnly);

router.get("/", async (req, res, next) => {
  try {
    const q = String(req.query.q ?? "").trim() || undefined;
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const limit = Math.min(Number(req.query.limit ?? 50), 200);
    const offset = Math.max(Number(req.query.offset ?? 0), 0);
    const [list, summary] = await Promise.all([
      listFeedback({ q, category, status, limit, offset }),
      getFeedbackSummary(),
    ]);
    res.json({ ...list, summary });
  } catch (e) { next(e); }
});

const statusSchema = z.object({ status: z.enum(["new", "triaged", "closed"]) });

router.post("/:id/status", async (req, res, next) => {
  try {
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Invalid status" }); return; }
    const [r] = await db.query<any>(
      `UPDATE feedback SET status=? WHERE id=?`,
      [parsed.data.status, req.params.id],
    );
    if (!r || (r as any).affectedRows === 0) {
      res.status(404).json({ error: "Not found" }); return;
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
