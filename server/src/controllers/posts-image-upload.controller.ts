import path from "path";
import fs from "fs";
import multer from "multer";
import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "posts");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);

export const postImageUpload = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: 15 * 1024 * 1024 },
}).single("file");

export async function uploadPostImage(req: AuthRequest, res: Response) {
  if (!req.file) { res.status(400).json({ error: "No file provided." }); return; }
  const ext = path.extname(req.file.originalname).toLowerCase();
  if (!ALLOWED_EXT.has(ext) || !ALLOWED_MIME.has(req.file.mimetype)) {
    fs.unlinkSync(req.file.path);
    res.status(400).json({ error: "Only image files are allowed." });
    return;
  }
  const newName = `${req.file.filename}${ext}`;
  fs.renameSync(req.file.path, path.join(UPLOAD_DIR, newName));
  res.json({ url: `/uploads/posts/${newName}` });
}
