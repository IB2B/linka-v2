import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { getTrends, postRefresh } from "../controllers/trends.controller";

const router = Router();
router.use(authenticate);
router.get("/", getTrends);
router.post("/refresh", postRefresh);
export default router;
