import path from "path";
import fs from "fs";
import multer from "multer";
import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "inbox");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".pdf"]);
const ALLOWED_MIME = new Set([
  "image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf",
]);

export const uploadMiddleware = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: 20 * 1024 * 1024 },
}).single("file");

export async function uploadInboxFile(req: AuthRequest, res: Response) {
  if (!req.file) { res.status(400).json({ error: "No file provided." }); return; }
  const ext = path.extname(req.file.originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext) || !ALLOWED_MIME.has(req.file.mimetype)) {
    fs.unlinkSync(req.file.path);
    res.status(400).json({ error: "File type not allowed." });
    return;
  }
  const newName = `${req.file.filename}${ext}`;
  const newPath = path.join(UPLOAD_DIR, newName);
  fs.renameSync(req.file.path, newPath);
  res.json({ url: `/uploads/inbox/${newName}` });
}
