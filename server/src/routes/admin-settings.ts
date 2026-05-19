import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { listIntegrations } from "../lib/admin-integrations";

const router = Router();
router.use(adminOnly);

router.get("/integrations", (_req, res) => { res.json({ integrations: listIntegrations() }); });

export default router;
