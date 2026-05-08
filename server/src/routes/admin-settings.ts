import { Router } from "express";
import { z } from "zod";
import { adminOnly } from "../middleware/admin";
import { fetchSettings, updateSettings } from "../lib/admin-settings";
import { listIntegrations } from "../lib/admin-integrations";

const router = Router();
router.use(adminOnly);

const schema = z.object({
  maintenanceMode: z.boolean().optional(),
  signupsEnabled: z.boolean().optional(),
  trialDays: z.number().int().min(0).max(90).optional(),
  minPasswordLength: z.number().int().min(6).max(128).optional(),
  requireMfa: z.boolean().optional(),
  sessionTimeoutMin: z.number().int().min(15).max(43200).optional(),
  autoSuspendDays: z.number().int().min(0).max(365).optional(),
  alertEmail: z.string().email().nullable().or(z.literal("")).optional(),
  slackWebhookUrl: z.string().url().nullable().or(z.literal("")).optional(),
  dailyDigestEnabled: z.boolean().optional(),
  logoUrl: z.string().url().nullable().or(z.literal("")).optional(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).nullable().or(z.literal("")).optional(),
  emailSenderName: z.string().max(100).nullable().or(z.literal("")).optional(),
  emailFooterText: z.string().max(500).nullable().or(z.literal("")).optional(),
});

router.get("/", async (_req, res, next) => {
  try { res.json(await fetchSettings()); } catch (e) { next(e); }
});

router.patch("/", async (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    await updateSettings(parsed.data);
    res.json(await fetchSettings());
  } catch (e) { next(e); }
});

router.get("/integrations", (_req, res) => { res.json({ integrations: listIntegrations() }); });

export default router;
