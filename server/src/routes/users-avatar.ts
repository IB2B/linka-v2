import { Router, type RequestHandler } from "express";
import { unlink } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { avatarUpload, AVATAR_DIR } from "../lib/avatar-upload";

const router = Router();
router.use(authenticate);

const handleUpload: RequestHandler = (req, res) => {
  avatarUpload.single("avatar")(req, res, async (err) => {
    const r = req as AuthRequest;
    if (err) { res.status(400).json({ error: err.message }); return; }
    if (!r.file) { res.status(400).json({ error: "No file uploaded." }); return; }
    const url = `/uploads/avatars/${r.file.filename}`;
    try {
      const [rows] = await db.query<any[]>(
        "SELECT avatar_url FROM user_profiles WHERE user_id = ?", [r.user!.id],
      );
      const prev = rows[0]?.avatar_url as string | undefined;
      await db.query(
        `INSERT INTO user_profiles (id, user_id, avatar_url) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE avatar_url = VALUES(avatar_url)`,
        [randomUUID(), r.user!.id, url],
      );
      if (prev?.startsWith("/uploads/avatars/")) {
        await unlink(join(AVATAR_DIR, prev.split("/").pop()!)).catch(() => {});
      }
      res.json({ avatarUrl: url });
    } catch (e) {
      await unlink(r.file.path).catch(() => {});
      res.status(500).json({ error: (e as Error).message });
    }
  });
};

router.post("/", handleUpload);

export default router;
