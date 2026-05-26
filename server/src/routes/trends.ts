import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireBusinessFeature } from "../middleware/require-feature";
import { getTrends, postRefresh } from "../controllers/trends.controller";

const router = Router();
router.use(authenticate);
router.use(requireBusinessFeature);
router.get("/", getTrends);
router.post("/refresh", postRefresh);
export default router;
