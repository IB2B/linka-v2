import { Router } from "express";

import { authenticate } from "../middleware/auth";
import { getBoard } from "../controllers/pipelines.controller";
import { create, update, remove } from "../controllers/opportunities.controller";
import { move } from "../controllers/opportunities-move.controller";

const router = Router();
router.use(authenticate);

router.get("/", getBoard);
router.post("/opportunities", create);
router.patch("/opportunities/:id", update);
router.patch("/opportunities/:id/move", move);
router.delete("/opportunities/:id", remove);

export default router;
