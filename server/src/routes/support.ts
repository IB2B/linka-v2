import { Router, type RequestHandler } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { supportUpload } from "../lib/support-upload";
import { notifyAdminsOfNewTicket } from "../lib/support-notify";
import { listUserTicketNotifications } from "../controllers/user-ticket-notifications.controller";
import { listUserTickets } from "../controllers/user-tickets-list.controller";
import threadRouter from "./support-thread";
import { SUPPORT_ATTACHMENT_RE } from "../lib/support-attachment";

const router = Router();
router.use(authenticate);

const createSchema = z.object({
  subject: z.string().trim().min(3).max(255),
  body: z.string().trim().min(10).max(5000),
  category: z.enum(["bug", "billing", "feature", "account", "other"]),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  attachmentUrl: z.string().regex(SUPPORT_ATTACHMENT_RE).optional(),
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
router.get("/notifications", listUserTicketNotifications);
router.get("/tickets", listUserTickets);

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
    notifyAdminsOfNewTicket({ ticketId: id, userId: req.user!.id, subject, body, category, priority })
      .catch((e) => console.error("[support-notify]", e));
    res.status(201).json({ id });
  } catch (e) { next(e); }
});

router.use("/tickets/:id", threadRouter);

export default router;
