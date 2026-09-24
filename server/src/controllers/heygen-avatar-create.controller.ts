import fs from "fs/promises";
import multer from "multer";
import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { assertWalletFunded } from "../lib/heygen-wallet";
import { uploadAvatarAsset, createPhotoAvatar } from "../lib/heygen-photo-avatar";
import { getLook } from "../lib/heygen-look";
import { getMonthlyUsage } from "../lib/posts-monthly-usage";
import { isPaidTier } from "../lib/plan-features";
import { claimAvatarGroup, groupOwner } from "../models/user-avatar-groups.model";

// HeyGen v3 takes PNG and JPEG only.
const ALLOWED = new Set(["image/jpeg", "image/png"]);

export const avatarImageUpload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 15 * 1024 * 1024 },
}).single("file");

export async function createAvatar(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  const file = req.file;
  try {
    if (!file) { res.status(400).json({ error: "No photo provided." }); return; }
    if (!ALLOWED.has(file.mimetype)) {
      res.status(400).json({ error: "Use a JPG or PNG photo." });
      return;
    }
    if (!isPaidTier((await getMonthlyUsage(req.user!.id)).tier)) {
      res.status(403).json({ error: "Your own avatar is included from the Creator plan.", code: "VIDEO_REQUIRES_PAID" });
      return;
    }
    const name = String(req.body?.name ?? "").trim().slice(0, 80) || "My avatar";
    // Creating bills the wallet, so fail before the upload rather than after.
    await assertWalletFunded();

    const assetId = await uploadAvatarAsset(
      await fs.readFile(file.path), file.mimetype, file.originalname || "photo",
    );
    const { lookId, groupId } = await createPhotoAvatar(name, assetId);
    // Claim at once: an unclaimed group is shown to every user as a house avatar.
    await claimAvatarGroup(groupId, req.user!.id, name);
    res.json({ groupId, lookId, status: "processing" });
  } catch (e) { next(e); }
  finally {
    if (file?.path) await fs.unlink(file.path).catch(() => {});
  }
}

// Training takes a few minutes; the settings page polls this until it is done.
export async function avatarLookStatus(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const look = await getLook(String(req.params.id));
    const owner = look?.groupId ? await groupOwner(look.groupId) : null;
    if (!look || owner !== req.user!.id) {
      res.status(404).json({ error: "Avatar not found." });
      return;
    }
    res.json({ status: look.status, error: look.error, previewImage: look.previewImage });
  } catch (e) { next(e); }
}
