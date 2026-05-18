import { Router } from "express";
import { z } from "zod";
import { adminOnly, type AuthRequest } from "../middleware/admin";
import { listPayments, getMonthlyRevenue } from "../lib/admin-payments";
import { refundUser } from "../lib/admin-refund";

const router = Router();
router.use(adminOnly);

const refundSchema = z.object({ chargeId: z.string().min(1) });

router.get("/", async (req, res, next) => {
  try {
    const from = typeof req.query.from === "string" ? req.query.from : undefined;
    const to = typeof req.query.to === "string" ? req.query.to : undefined;
    res.json({ payments: await listPayments(500, { from, to }) });
  } catch (e) { next(e); }
});

router.get("/revenue", async (_req, res, next) => {
  try {
    res.json({ revenue: await getMonthlyRevenue(12) });
  } catch (e) { next(e); }
});

router.post("/refund-user/:userId", async (req, res) => {
  try {
    const adminId = (req as AuthRequest).user?.id;
    if (!adminId) { res.status(401).json({ error: "Unauthorized" }); return; }
    const parsed = refundSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Missing chargeId." }); return; }
    const result = await refundUser(req.params.userId, adminId, parsed.data.chargeId);
    res.json(result);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Refund failed.";
    res.status(400).json({ error: msg });
  }
});

export default router;
