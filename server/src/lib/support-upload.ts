import { mkdirSync } from "node:fs";
import { join, extname } from "node:path";
import { randomUUID } from "node:crypto";
import multer from "multer";

export const SUPPORT_DIR = join(process.cwd(), "uploads", "support");
mkdirSync(SUPPORT_DIR, { recursive: true });

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, SUPPORT_DIR),
  filename: (_req, file, cb) => {
    const ext =
      file.mimetype === "image/png" ? ".png"
      : file.mimetype === "image/webp" ? ".webp"
      : file.mimetype === "image/gif" ? ".gif"
      : ".jpg";
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const supportUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = extname(file.originalname).toLowerCase();
    if (ALLOWED_MIME.has(file.mimetype) && ALLOWED_EXT.has(ext)) cb(null, true);
    else cb(new Error("Only JPG, PNG, WebP or GIF images are allowed."));
  },
});
