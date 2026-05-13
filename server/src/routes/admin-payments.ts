import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { listCharges, listInvoices } from "../lib/admin-payments";

const router = Router();
router.use(adminOnly);

router.get("/charges", async (req, res, next) => {
  try {
    const from = typeof req.query.from === "string" ? req.query.from : undefined;
    const to = typeof req.query.to === "string" ? req.query.to : undefined;
    res.json({ charges: await listCharges(50, { from, to }) });
  } catch (e) { next(e); }
});

router.get("/invoices", async (req, res, next) => {
  try {
    const from = typeof req.query.from === "string" ? req.query.from : undefined;
    const to = typeof req.query.to === "string" ? req.query.to : undefined;
    res.json({ invoices: await listInvoices(50, { from, to }) });
  } catch (e) { next(e); }
});

export default router;
