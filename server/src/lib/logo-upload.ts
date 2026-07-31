import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import multer from "multer";

export const LOGO_DIR = join(process.cwd(), "uploads", "logos");
mkdirSync(LOGO_DIR, { recursive: true });

// PNG and WebP first — a logo with no transparency lands on the photo inside a
// white box, which is worse than no logo at all. JPG is accepted so an upload
// does not hard-fail, but it will look like a sticker.
const ALLOWED = new Set(["image/png", "image/webp", "image/jpeg"]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, LOGO_DIR),
  filename: (_req, file, cb) => {
    const ext = file.mimetype === "image/jpeg" ? ".jpg"
      : file.mimetype === "image/webp" ? ".webp" : ".png";
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const logoUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.has(file.mimetype)) cb(null, true);
    else cb(new Error("Use a PNG, WebP or JPG logo."));
  },
});
