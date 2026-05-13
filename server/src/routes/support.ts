import { Router, type RequestHandler } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { supportUpload } from "../lib/support-upload";
import threadRouter from "./support-thread";

const router = Router();
router.use(authenticate);

const ATTACH_RE = /^\/uploads\/support\/[\w.-]+$/;

const createSchema = z.object({
  subject: z.string().trim().min(3).max(255),
  body: z.string().trim().min(10).max(5000),
  category: z.enum(["bug", "billing", "feature", "account", "other"]),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  attachmentUrl: z.string().regex(ATTACH_RE).optional(),
});

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

router.use("/tickets/:id", threadRouter);

export default router;
