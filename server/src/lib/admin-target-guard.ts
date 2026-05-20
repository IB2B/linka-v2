import type { Response } from "express";
import { db } from "./db";
import type { AuthRequest } from "../middleware/auth";

export async function guardAdminTarget(
  req: AuthRequest, res: Response,
): Promise<boolean> {
  const targetId = String(req.params.id);
  if (targetId === req.user!.id) {
    res.status(400).json({ error: "Cannot act on yourself." });
    return false;
  }
  const [[t]] = await db.query<any[]>(
    "SELECT role FROM users WHERE id = ? AND deleted_at IS NULL",
    [targetId],
  );
  if (t?.role === "ADMIN") {
    res.status(403).json({ error: "Cannot act on another admin." });
    return false;
  }
  return true;
}
