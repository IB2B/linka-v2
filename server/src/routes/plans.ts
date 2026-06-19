import { Router } from "express";
import { getPlanPrices } from "../lib/stripe-plan-prices";

// Public — pricing is shown on the unauthenticated landing page.
const router = Router();

router.get("/prices", async (_req, res, next) => {
  try {
    res.json(await getPlanPrices());
  } catch (e) { next(e); }
});

export default router;
