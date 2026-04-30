import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";

const router = Router();
router.use(authenticate);

const createSchema = z.object({
  subject: z.string().trim().min(3).max(255),
  body: z.string().trim().min(10).max(5000),
  category: z.enum(["bug", "billing", "feature", "account", "other"]),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
});

router.get("/tickets", async (req: AuthRequest, res, next) => {
  try {
    const [rows] = await db.query<any[]>(
      `SELECT id, subject, status, priority, category, created_at, updated_at
       FROM support_tickets WHERE user_id = ? ORDER BY created_at DESC LIMIT 25`,
      [req.user!.id],
    );
    res.json({ tickets: rows.map((r) => ({
      id: r.id, subject: r.subject, status: r.status, priority: r.priority,
      category: r.category, createdAt: r.created_at, updatedAt: r.updated_at,
    })) });
  } catch (e) { next(e); }
});

router.post("/tickets", async (req: AuthRequest, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }
    const id = randomUUID();
    const { subject, body, category, priority } = parsed.data;
    await db.query(
      `INSERT INTO support_tickets (id, user_id, subject, body, status, priority, category)
       VALUES (?, ?, ?, ?, 'open', ?, ?)`,
      [id, req.user!.id, subject, body, priority, category],
    );
    res.status(201).json({ id });
  } catch (e) { next(e); }
});

export default router;
