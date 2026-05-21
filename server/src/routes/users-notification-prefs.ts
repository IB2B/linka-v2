import type { Response } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";
import type { RowDataPacket } from "mysql2";

type Row = RowDataPacket & {
  notif_published: 0 | 1;
  notif_failed: 0 | 1;
  notif_limit: 0 | 1;
};

const PATCH = z.object({
  notifPublished: z.boolean().optional(),
  notifFailed: z.boolean().optional(),
  notifLimit: z.boolean().optional(),
});

export async function getNotificationPrefs(
  req: AuthRequest, res: Response,
): Promise<void> {
  const [rows] = await db.query<Row[]>(
    "SELECT notif_published, notif_failed, notif_limit FROM users WHERE id = ?",
    [req.user!.id],
  );
  const r = rows[0];
  if (!r) { res.status(404).json({ error: "Not found" }); return; }
  res.json({
    notifPublished: !!r.notif_published,
    notifFailed: !!r.notif_failed,
    notifLimit: !!r.notif_limit,
  });
}

const COLS: Record<keyof z.infer<typeof PATCH>, string> = {
  notifPublished: "notif_published",
  notifFailed: "notif_failed",
  notifLimit: "notif_limit",
};

export async function patchNotificationPrefs(
  req: AuthRequest, res: Response,
): Promise<void> {
  const parsed = PATCH.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message }); return;
  }
  const entries = Object.entries(parsed.data) as [keyof typeof COLS, boolean][];
  if (entries.length === 0) { res.json({ ok: true }); return; }
  const sets = entries.map(([k]) => `${COLS[k]} = ?`).join(", ");
  const vals = entries.map(([, v]) => v);
  await db.query(`UPDATE users SET ${sets} WHERE id = ?`, [...vals, req.user!.id]);
  res.json({ ok: true });
}
