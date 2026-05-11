import { Router, type RequestHandler } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { supportUpload } from "../lib/support-upload";

const router = Router();
router.use(authenticate);

const createSchema = z.object({
  subject: z.string().trim().min(3).max(255),
  body: z.string().trim().min(10).max(5000),
  category: z.enum(["bug", "billing", "feature", "account", "other"]),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  attachmentUrl: z.string().trim().max(500).optional(),
});

const replySchema = z.object({
  body: z.string().trim().min(1).max(5000),
  attachmentUrl: z.string().trim().max(500).optional(),
});

const rateSchema = z.object({ rating: z.coerce.number().int().min(1).max(5) });

const uploadHandler: RequestHandler = (req, res) => {
  supportUpload.single("file")(req, res, (err) => {
    if (err) { res.status(400).json({ error: err.message }); return; }
    const r = req as AuthRequest & { file?: Express.Multer.File };
    if (!r.file) { res.status(400).json({ error: "No file uploaded." }); return; }
    res.json({ url: `/uploads/support/${r.file.filename}` });
  });
};

router.post("/upload", uploadHandler);

router.get("/tickets", async (req: AuthRequest, res, next) => {
  try {
    const [rows] = await db.query<any[]>(
      `SELECT t.id, t.subject, t.status, t.priority, t.category, t.rating,
              t.created_at, t.updated_at, t.last_viewed_at,
              EXISTS(
                SELECT 1 FROM support_ticket_replies r
                WHERE r.ticket_id = t.id AND r.is_admin = TRUE
                  AND r.created_at > IFNULL(t.last_viewed_at, '1970-01-01')
              ) AS has_unread
       FROM support_tickets t
       WHERE t.user_id = ? ORDER BY t.created_at DESC LIMIT 50`,
      [req.user!.id],
    );
    res.json({ tickets: rows.map((r) => ({
      id: r.id, subject: r.subject, status: r.status, priority: r.priority,
      category: r.category, rating: r.rating ?? null,
      createdAt: r.created_at, updatedAt: r.updated_at,
      hasUnread: Boolean(r.has_unread),
    })) });
  } catch (e) { next(e); }
});

router.post("/tickets", async (req: AuthRequest, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message }); return;
    }
    const id = randomUUID();
    const { subject, body, category, priority, attachmentUrl } = parsed.data;
    await db.query(
      `INSERT INTO support_tickets
        (id, user_id, subject, body, attachment_url, status, priority, category)
       VALUES (?, ?, ?, ?, ?, 'open', ?, ?)`,
      [id, req.user!.id, subject, body, attachmentUrl ?? null, priority, category],
    );
    res.status(201).json({ id });
  } catch (e) { next(e); }
});

router.get("/tickets/:id", async (req: AuthRequest, res, next) => {
  try {
    const [[t]] = await db.query<any[]>(
      `SELECT id, subject, body, attachment_url, status, priority, category, rating,
              created_at, updated_at, closed_at
       FROM support_tickets WHERE id = ? AND user_id = ? LIMIT 1`,
      [req.params.id, req.user!.id],
    );
    if (!t) { res.status(404).json({ error: "Not found" }); return; }
    const [replies] = await db.query<any[]>(
      `SELECT r.id, r.body, r.attachment_url, r.is_admin, r.created_at,
              u.first_name, u.last_name, u.email, p.avatar_url
       FROM support_ticket_replies r
       INNER JOIN users u ON u.id = r.author_id
       LEFT JOIN user_profiles p ON p.user_id = u.id
       WHERE r.ticket_id = ? ORDER BY r.created_at ASC`,
      [req.params.id],
    );
    res.json({
      ticket: {
        id: t.id, subject: t.subject, body: t.body,
        attachmentUrl: t.attachment_url ?? null,
        status: t.status, priority: t.priority, category: t.category ?? null,
        rating: t.rating ?? null,
        createdAt: new Date(t.created_at).toISOString(),
        updatedAt: new Date(t.updated_at).toISOString(),
        closedAt: t.closed_at ? new Date(t.closed_at).toISOString() : null,
      },
      replies: replies.map((r) => ({
        id: r.id, body: r.body,
        attachmentUrl: r.attachment_url ?? null,
        isAdmin: Boolean(r.is_admin),
        createdAt: new Date(r.created_at).toISOString(),
        author: {
          firstName: r.first_name, lastName: r.last_name,
          email: r.email, avatarUrl: r.avatar_url ?? null,
        },
      })),
    });
  } catch (e) { next(e); }
});

router.post("/tickets/:id/reply", async (req: AuthRequest, res, next) => {
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

router.post("/tickets/:id/view", async (req: AuthRequest, res, next) => {
  try {
    await db.query(
      `UPDATE support_tickets SET last_viewed_at = NOW(3)
       WHERE id = ? AND user_id = ?`,
      [req.params.id, req.user!.id],
    );
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.post("/tickets/:id/resolve", async (req: AuthRequest, res, next) => {
  try {
    const [r] = await db.query<any>(
      `UPDATE support_tickets SET status = 'resolved'
       WHERE id = ? AND user_id = ? AND status IN ('open','pending')`,
      [req.params.id, req.user!.id],
    );
    if (!r || (r as any).affectedRows === 0) {
      res.status(400).json({ error: "Cannot resolve this ticket" }); return;
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.post("/tickets/:id/rate", async (req: AuthRequest, res, next) => {
  try {
    const parsed = rateSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Invalid rating" }); return; }
    const [r] = await db.query<any>(
      `UPDATE support_tickets SET rating = ?
       WHERE id = ? AND user_id = ? AND status IN ('resolved','closed')`,
      [parsed.data.rating, req.params.id, req.user!.id],
    );
    if (!r || (r as any).affectedRows === 0) {
      res.status(400).json({ error: "Cannot rate this ticket yet" }); return;
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
