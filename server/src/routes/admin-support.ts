import { Router } from "express";
import { z } from "zod";
import { adminOnly, type AuthRequest } from "../middleware/admin";
import { listSupportTickets } from "../lib/admin-support-list";
import { getSupportSummary } from "../lib/admin-support-summary";
import { getTicketDetail } from "../lib/admin-support-detail";
import { addAdminReply } from "../lib/admin-support-reply";
import { updateTicket } from "../controllers/admin-support-update.controller";
import { SUPPORT_ATTACHMENT_RE } from "../lib/support-attachment";

const router = Router();
router.use(adminOnly);

router.get("/:id", async (req, res, next) => {
  try {
    const detail = await getTicketDetail(req.params.id);
    if (!detail) { res.status(404).json({ error: "Not found" }); return; }
    res.json(detail);
  } catch (e) { next(e); }
});

router.get("/", async (req, res, next) => {
  try {
    const q = String(req.query.q ?? "").trim() || undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const priority = typeof req.query.priority === "string" ? req.query.priority : undefined;
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const limit = Math.min(Number(req.query.limit ?? 50), 200);
    const offset = Math.max(Number(req.query.offset ?? 0), 0);
    const [list, summary] = await Promise.all([
      listSupportTickets({ q, status, priority, category, limit, offset }),
      getSupportSummary(),
    ]);
    res.json({ ...list, summary });
  } catch (e) { next(e); }
});

router.patch("/:id", updateTicket);

const replySchema = z.object({
  body: z.string().trim().min(1).max(5000),
  attachmentUrl: z.string().regex(SUPPORT_ATTACHMENT_RE).optional(),
});

router.post("/:id/reply", async (req: AuthRequest, res, next) => {
  try {
    const parsed = replySchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Message required" }); return; }
    const id = await addAdminReply(req.params.id, req.user!.id, parsed.data.body, parsed.data.attachmentUrl);
    res.status(201).json({ id });
  } catch (e: any) {
    if (e.status === 404) { res.status(404).json({ error: "Not found" }); return; }
    next(e);
  }
});

export default router;
