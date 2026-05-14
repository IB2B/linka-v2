import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { getAiUsageKpis } from "../lib/ai-usage-kpis";
import { getAiUsageSeries } from "../lib/ai-usage-series";
import {
  getImageBreakdown, getTopGenerators, getDraftPlatformMix, getModelBreakdown,
} from "../lib/ai-usage-extras";

const router = Router();
router.use(adminOnly);

const ALLOWED = new Set([7, 30, 90]);

router.get("/overview", async (req, res, next) => {
  try {
    const raw = Number(req.query.days ?? 30);
    const days = ALLOWED.has(raw) ? raw : 30;
    const [kpis, series, imageBreakdown, topGenerators, platforms, models] =
      await Promise.all([
        getAiUsageKpis(days),
        getAiUsageSeries(days),
        getImageBreakdown(days),
        getTopGenerators(days),
        getDraftPlatformMix(days),
        getModelBreakdown(days),
      ]);
    res.json({
      range: { days },
      kpis, series, imageBreakdown, topGenerators, platforms, models,
    });
  } catch (e) { next(e); }
});

export default router;
