import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";
import { getTicketWithReplies } from "../lib/support-ticket-detail";
import { resolveTicket, rateTicket, markTicketViewed } from "../lib/support-ticket-actions";

const router = Router({ mergeParams: true });

const ATTACH_RE = /^\/uploads\/support\/[\w.-]+$/;

const replySchema = z.object({
  body: z.string().trim().min(1).max(5000),
  attachmentUrl: z.string().regex(ATTACH_RE).optional(),
});

const rateSchema = z.object({ rating: z.coerce.number().int().min(1).max(5) });

router.get("/", async (req: AuthRequest, res, next) => {
  try {
    const detail = await getTicketWithReplies(req.params.id, req.user!.id);
    if (!detail) { res.status(404).json({ error: "Not found" }); return; }
    res.json(detail);
  } catch (e) { next(e); }
});

router.post("/reply", async (req: AuthRequest, res, next) => {
  try {
    const parsed = replySchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Message required" }); return; }
    const [[t]] = await db.query<any[]>(
      `SELECT id FROM support_tickets WHERE id = ? AND user_id = ? LIMIT 1`,
      [req.params.id, req.user!.id],
    );
    if (!t) { res.status(404).json({ error: "Not found" }); return; }
    const id = randomUUID();
    await db.query(
      `INSERT INTO support_ticket_replies
        (id, ticket_id, author_id, body, attachment_url, is_admin)
       VALUES (?, ?, ?, ?, ?, FALSE)`,
      [id, req.params.id, req.user!.id, parsed.data.body, parsed.data.attachmentUrl ?? null],
    );
    await db.query(
      `UPDATE support_tickets
       SET status = IF(status IN ('resolved','closed'),'open',status),
           closed_at = IF(status='closed', NULL, closed_at)
       WHERE id = ?`, [req.params.id],
    );
    res.status(201).json({ id });
  } catch (e) { next(e); }
});

router.post("/view", async (req: AuthRequest, res, next) => {
  try {
    await markTicketViewed(req.params.id, req.user!.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.post("/resolve", async (req: AuthRequest, res, next) => {
  try {
    const ok = await resolveTicket(req.params.id, req.user!.id);
    if (!ok) { res.status(400).json({ error: "Cannot resolve this ticket" }); return; }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.post("/rate", async (req: AuthRequest, res, next) => {
  try {
    const parsed = rateSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Invalid rating" }); return; }
    const ok = await rateTicket(req.params.id, req.user!.id, parsed.data.rating);
    if (!ok) { res.status(400).json({ error: "Cannot rate this ticket yet" }); return; }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
