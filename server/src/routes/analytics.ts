import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { getPostAnalytics } from "../controllers/analytics.controller";
import { getAnalyticsSummary } from "../controllers/analytics-summary.controller";
import { getPostTimeseries } from "../controllers/analytics-timeseries.controller";
import { getDailyEngagement } from "../controllers/analytics-daily.controller";

const router = Router();
router.use(authenticate);

router.get("/summary", getAnalyticsSummary);
router.get("/daily", getDailyEngagement);
router.get("/posts/:id", getPostAnalytics);
router.get("/posts/:id/timeseries", getPostTimeseries);

export default router;
