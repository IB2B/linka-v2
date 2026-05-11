import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { getAnalyticsKpis } from "../lib/admin-analytics";
import { getAnalyticsSeries } from "../lib/admin-analytics-series";
import {
  getEngagementTotals, getPlanTierBreakdown,
  getPlatformBreakdown, getTopPublishers,
} from "../lib/admin-analytics-breakdowns";
import {
  getFunnel, getIndustryBreakdown, getPostingByHour,
} from "../lib/admin-analytics-extra";
import { getAiUsage } from "../lib/admin-analytics-ai";

const router = Router();
router.use(adminOnly);

const ALLOWED = new Set([7, 30, 90]);

router.get("/overview", async (req, res, next) => {
  try {
    const raw = Number(req.query.days ?? 30);
    const days = ALLOWED.has(raw) ? raw : 30;
    const [
      kpis, series, platforms, plans, top, engagement,
      funnel, hours, industries, ai,
    ] = await Promise.all([
      getAnalyticsKpis(days),
      getAnalyticsSeries(days),
      getPlatformBreakdown(days),
      getPlanTierBreakdown(),
      getTopPublishers(days),
      getEngagementTotals(days),
      getFunnel(days),
      getPostingByHour(days),
      getIndustryBreakdown(),
      getAiUsage(days),
    ]);
    res.json({
      range: { days },
      kpis, series, platforms, plans,
      topPublishers: top, engagement,
      funnel, hours, industries, ai,
    });
  } catch (e) { next(e); }
});

export default router;
