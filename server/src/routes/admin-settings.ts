import { Router } from "express";
import { z } from "zod";
import { adminOnly } from "../middleware/admin";
import { checkIntegrations } from "../lib/admin-integrations";
import { getPlatformSettings, updatePlatformSettings } from "../lib/platform-settings";

const router = Router();
router.use(adminOnly);

router.get("/integrations", async (_req, res, next) => {
  try {
    res.json({ integrations: await checkIntegrations(), checkedAt: new Date().toISOString() });
  } catch (e) { next(e); }
});

router.get("/platform", async (_req, res, next) => {
  try { res.json({ settings: await getPlatformSettings() }); } catch (e) { next(e); }
});

const platformSchema = z.object({
  signupsEnabled: z.boolean(),
  maintenanceMode: z.boolean(),
  maintenanceMessage: z.string().max(280).nullable(),
  announcementEnabled: z.boolean(),
  announcementMessage: z.string().max(280).nullable(),
});

router.put("/platform", async (req, res, next) => {
  try {
    const parsed = platformSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    await updatePlatformSettings(parsed.data);
    res.json({ settings: parsed.data });
  } catch (e) { next(e); }
});

export default router;
