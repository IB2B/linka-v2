import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { getPlatformSettings } from "../lib/platform-settings";

// Public (authenticated) read of the user-facing platform notices, used by the
// dashboard to render maintenance / announcement banners.
const router = Router();

router.get("/", authenticate, async (_req, res, next) => {
  try {
    const s = await getPlatformSettings();
    res.json({
      maintenanceMode: s.maintenanceMode,
      maintenanceMessage: s.maintenanceMessage,
      announcementEnabled: s.announcementEnabled,
      announcementMessage: s.announcementMessage,
    });
  } catch (e) { next(e); }
});

export default router;
