import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { listCandidates } from "../controllers/recycler-candidates.controller";
import { regenerateFromPost } from "../controllers/recycler-regenerate.controller";
import {
  getRecyclerSettings, updateRecyclerSettings,
} from "../controllers/recycler-settings.controller";

const router = Router();
router.use(authenticate);

router.get("/candidates", listCandidates);
router.post("/regenerate", regenerateFromPost);
router.get("/settings", getRecyclerSettings);
router.put("/settings", updateRecyclerSettings);

export default router;
