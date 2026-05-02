import { Router } from "express";

import { authenticate } from "../middleware/auth";
import { getBoard } from "../controllers/pipelines.controller";
import { createPipeline } from "../controllers/pipelines-write.controller";
import { create, update, remove } from "../controllers/opportunities.controller";
import { move } from "../controllers/opportunities-move.controller";
import {
  createStage, updateStage, removeStage,
} from "../controllers/stages.controller";

const router = Router();
router.use(authenticate);

router.get("/", getBoard);
router.post("/", createPipeline);
router.post("/stages", createStage);
router.patch("/stages/:id", updateStage);
router.delete("/stages/:id", removeStage);
router.post("/opportunities", create);
router.patch("/opportunities/:id", update);
router.patch("/opportunities/:id/move", move);
router.delete("/opportunities/:id", remove);

export default router;
