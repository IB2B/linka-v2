import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { rateLimit } from "../lib/rate-limit";

const router = Router();
router.use(authenticate);

const schema = z.object({
  category: z.enum(["feature", "general"]),
  message: z.string().trim().min(5).max(5000),
  pageUrl: z.string().trim().min(1).max(500).optional(),
});

const HOUR = 60 * 60 * 1000;

router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }
    const limit = rateLimit(`feedback:${req.user!.id}`, 5, HOUR);
    if (!limit.allowed) {
      res.status(429).json({
        error: "Too many submissions. Try again in a bit.",
        retryAfterMs: limit.retryAfterMs,
      });
      return;
    }
    const id = randomUUID();
    const { category, message, pageUrl } = parsed.data;
    const ua = req.headers["user-agent"];
    const userAgent = (typeof ua === "string" ? ua : "").slice(0, 500);
    await db.query(
      `INSERT INTO feedback (id, user_id, category, message, page_url, user_agent)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, req.user!.id, category, message, pageUrl ?? null, userAgent],
    );
    res.status(201).json({ id });
  } catch (e) { next(e); }
});

export default router;
