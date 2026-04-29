import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import multer from "multer";

export const AVATAR_DIR = join(process.cwd(), "uploads", "avatars");
mkdirSync(AVATAR_DIR, { recursive: true });

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, AVATAR_DIR),
  filename: (_req, file, cb) => {
    const ext = file.mimetype === "image/png" ? ".png"
      : file.mimetype === "image/webp" ? ".webp" : ".jpg";
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const avatarUpload = multer({
  storage,
  limits: { fileSize: 2.5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.has(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG or WebP images are allowed."));
  },
});
