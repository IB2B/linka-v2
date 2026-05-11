import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import multer from "multer";

export const COMMENT_IMAGE_DIR =
  join(process.cwd(), "uploads", "comment-images");
mkdirSync(COMMENT_IMAGE_DIR, { recursive: true });

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, COMMENT_IMAGE_DIR),
  filename: (_req, file, cb) => {
    const ext =
      file.mimetype === "image/png" ? ".png"
      : file.mimetype === "image/webp" ? ".webp"
      : file.mimetype === "image/gif" ? ".gif"
      : ".jpg";
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const commentImageUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.has(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG, WebP or GIF images are allowed."));
  },
});
