import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { listAvatars } from "../controllers/heygen-avatars.controller";
import { listVoices } from "../controllers/heygen-voices.controller";
import { getAvatarSettings, putAvatarSettings }
  from "../controllers/avatar-settings.controller";

const router = Router();
router.use(authenticate);

router.get("/avatars", listAvatars);
router.get("/voices", listVoices);
router.get("/settings", getAvatarSettings);
router.put("/settings", putAvatarSettings);

export default router;
