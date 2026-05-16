import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireProFeature } from "../middleware/require-feature";
import { getTrends, postRefresh } from "../controllers/trends.controller";

const router = Router();
router.use(authenticate);
router.use(requireProFeature);
router.get("/", getTrends);
router.post("/refresh", postRefresh);
export default router;
