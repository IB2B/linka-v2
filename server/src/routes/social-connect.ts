import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { lateFetch } from "../lib/late-api";
import { getOrCreateLateProfile } from "../lib/late-profile";

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

  const qs = new URLSearchParams({ profileId, redirect_url: redirect });
  const data = await lateFetch<{ authUrl: string }>(
    `/connect/${platform}?${qs.toString()}`,
  );
  res.json({ url: data.authUrl });
}
