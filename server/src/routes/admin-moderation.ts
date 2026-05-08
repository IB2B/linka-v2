import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { adminOnly, type AuthRequest } from "../middleware/admin";
import { listFlags } from "../lib/admin-moderation-list";
import { getModerationSummary } from "../lib/admin-moderation-summary";

const router = Router();
router.use(adminOnly);

router.get("/", async (req, res, next) => {
  try {
    const q = String(req.query.q ?? "").trim() || undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const reason = typeof req.query.reason === "string" ? req.query.reason : undefined;
    const limit = Math.min(Number(req.query.limit ?? 50), 200);
    const offset = Math.max(Number(req.query.offset ?? 0), 0);
    const [list, summary] = await Promise.all([
      listFlags({ q, status, reason, limit, offset }),
      getModerationSummary(),
    ]);
    res.json({ ...list, summary });
  } catch (e) { next(e); }
});

const action = z.object({ action: z.enum(["dismiss", "hide", "suspend"]) });

router.post("/:flagId/resolve", async (req: AuthRequest, res, next) => {
  try {
    const parsed = action.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Invalid action" }); return; }
    const adminId = req.user!.id;
    const [[flag]] = await db.query<any[]>(
      `SELECT cf.id, cf.content_id, g.user_id AS author_id
       FROM content_flags cf INNER JOIN generated_content g ON g.id = cf.content_id
       WHERE cf.id = ? LIMIT 1`, [req.params.flagId]);
    if (!flag) { res.status(404).json({ error: "Not found" }); return; }

    if (parsed.data.action === "dismiss") {
      await db.query(
        `UPDATE content_flags SET status='dismissed', resolution='dismissed',
         reviewed_by=?, reviewed_at=NOW() WHERE id=?`, [adminId, flag.id]);
    } else if (parsed.data.action === "hide") {
      await db.query(
        `UPDATE generated_content SET hidden_at=NOW(), hidden_by=? WHERE id=?`,
        [adminId, flag.content_id]);
      await db.query(
        `UPDATE content_flags SET status='actioned', resolution='hidden',
         reviewed_by=?, reviewed_at=NOW() WHERE id=?`, [adminId, flag.id]);
    } else {
      await db.query(`UPDATE users SET status='SUSPENDED' WHERE id=?`, [flag.author_id]);
      await db.query(
        `UPDATE generated_content SET hidden_at=NOW(), hidden_by=? WHERE id=?`,
        [adminId, flag.content_id]);
      await db.query(
        `UPDATE content_flags SET status='actioned', resolution='user_suspended',
         reviewed_by=?, reviewed_at=NOW() WHERE id=?`, [adminId, flag.id]);
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
