import { Router } from "express";
import { superAdminOnly } from "../middleware/admin";
import { listPayments, getMonthlyRevenue } from "../lib/admin-payments";

const router = Router();
router.use(superAdminOnly);

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

export default router;
