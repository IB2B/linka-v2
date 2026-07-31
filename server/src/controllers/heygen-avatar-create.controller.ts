import fs from "fs/promises";
import multer from "multer";
import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { assertWalletFunded } from "../lib/heygen-wallet";
import {
  uploadAvatarImage, createPhotoAvatarGroup, trainPhotoAvatarGroup,
  photoAvatarTrainStatus,
} from "../lib/heygen-photo-avatar";
import { claimAvatarGroup } from "../models/user-avatar-groups.model";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

export const avatarImageUpload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 15 * 1024 * 1024 },
}).single("file");

export async function createAvatar(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  const file = req.file;
  try {
    if (!file) { res.status(400).json({ error: "No image provided." }); return; }
    if (!ALLOWED.has(file.mimetype)) {
      res.status(400).json({ error: "Use a JPEG, PNG or WebP photo." });
      return;
    }
    const name = String(req.body?.name ?? "").trim() || "My avatar";
    // Training bills the wallet, so fail before the upload rather than after.
    await assertWalletFunded();

    const imageKey = await uploadAvatarImage(await fs.readFile(file.path), file.mimetype);
    const groupId = await createPhotoAvatarGroup(name, imageKey);
    // Claim before training: if training fails the group still exists in the
    // workspace, and an unclaimed group would be visible to every other user.
    await claimAvatarGroup(groupId, req.user!.id, name);
    await trainPhotoAvatarGroup(groupId);
    res.json({ groupId, status: "training" });
  } catch (e) { next(e); }
  finally {
    if (file?.path) await fs.unlink(file.path).catch(() => {});
  }
}

export async function avatarTrainStatus(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const status = await photoAvatarTrainStatus(String(req.params.id));
    res.json({ status });
  } catch (e) { next(e); }
}
