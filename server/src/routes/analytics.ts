import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireProFeature } from "../middleware/require-feature";
import { getPostAnalytics } from "../controllers/analytics.controller";
import { getAnalyticsSummary } from "../controllers/analytics-summary.controller";
import { getPostTimeseries } from "../controllers/analytics-timeseries.controller";
import { getDailyEngagement } from "../controllers/analytics-daily.controller";
import { getPlatformMetrics } from "../controllers/analytics-platform-metrics.controller";
import { getImageRoi } from "../controllers/analytics-image-roi.controller";

const router = Router();
router.use(authenticate);
router.use(requireProFeature);

router.get("/summary", getAnalyticsSummary);
router.get("/daily", getDailyEngagement);
router.get("/platform-metrics", getPlatformMetrics);
router.get("/image-roi", getImageRoi);
router.get("/posts/:id", getPostAnalytics);
router.get("/posts/:id/timeseries", getPostTimeseries);

export default router;
