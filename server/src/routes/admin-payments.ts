import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { listCharges, listInvoices } from "../lib/admin-payments";

const router = Router();
router.use(adminOnly);

router.get("/charges", async (_req, res, next) => {
  try {
    res.json({ charges: await listCharges(50) });
  } catch (e) { next(e); }
});

router.get("/invoices", async (_req, res, next) => {
  try {
    res.json({ invoices: await listInvoices(50) });
  } catch (e) { next(e); }
});

export default router;
