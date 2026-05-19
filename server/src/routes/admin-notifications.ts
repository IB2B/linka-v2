import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { listAdminNotifications } from "../controllers/admin-notifications.controller";
import { markOneRead, markAllRead } from "../controllers/admin-notifications-read.controller";

const router = Router();
router.use(adminOnly);

router.get("/", listAdminNotifications);
router.post("/read-all", markAllRead);
router.post("/:id/read", markOneRead);

export default router;
