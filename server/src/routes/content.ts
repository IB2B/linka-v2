import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { suggestTopics } from "../controllers/content-suggest-topics.controller";
import { generate } from "../controllers/content-generate.controller";

const router = Router();
router.use(authenticate);

router.post("/suggest-topics", suggestTopics);
router.post("/generate", generate);

export default router;
