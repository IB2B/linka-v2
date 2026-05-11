import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";

export function uploadCommentImage(
  req: AuthRequest, res: Response, next: NextFunction,
): void {
  try {
    const file = req.file;
    if (!file) { res.status(400).json({ error: "No file uploaded." }); return; }
    const url = `/uploads/comment-images/${file.filename}`;
    res.status(201).json({ url });
  } catch (e) { next(e); }
}
