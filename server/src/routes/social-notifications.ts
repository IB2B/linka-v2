import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { listSocialNotifications } from "../controllers/social-notifications.controller";
import { markSocialOneRead, markSocialAllRead } from "../controllers/social-notifications-read.controller";

const router = Router();
router.use(authenticate);

router.get("/", listSocialNotifications);
router.post("/read-all", markSocialAllRead);
router.post("/:id/read", markSocialOneRead);

export default router;
