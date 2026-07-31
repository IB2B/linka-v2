import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { isProfileMissing, lateConnectUrl } from "../lib/late-connect";
import { getOrCreateLateProfile, resetLateProfile } from "../lib/late-profile";

const SUPPORTED = new Set([
  "linkedin", "twitter", "threads", "tiktok",
  "instagram", "facebook", "youtube", "pinterest",
  "bluesky", "reddit",
]);

export async function getConnectUrl(req: AuthRequest, res: Response) {
  const platform = String(req.params.platform);
  if (!SUPPORTED.has(platform)) {
    res.status(400).json({ error: "Unsupported platform" });
    return;
  }
  const profileId = await getOrCreateLateProfile(req.user!.id);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const redirect = `${appUrl}/dashboard/accounts?connected=1`;

  res.json({ url: await connectUrlHealingStaleProfile(req, platform, profileId, redirect) });
}

async function connectUrlHealingStaleProfile(
  req: AuthRequest, platform: string, profileId: string, redirect: string,
): Promise<string> {
  try {
    return await lateConnectUrl(platform, profileId, redirect);
  } catch (err) {
    if (!isProfileMissing(err)) throw err;
    console.warn(`[connect] profile ${profileId} is gone — recreating it`);
    const fresh = await resetLateProfile(req.user!.id);
    return lateConnectUrl(platform, fresh, redirect);
  }
}
