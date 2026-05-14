import type { Response } from "express";
import { randomUUID } from "node:crypto";

import { db } from "../lib/db";
import {
  createOppSchema, updateOppSchema, toUpdateColumn, loadStage,
} from "../lib/pipelines";
import type { AuthRequest } from "../middleware/auth";

export async function create(req: AuthRequest, res: Response) {
  const parsed = createOppSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
  const stage = await loadStage(parsed.data.stageId, req.user!.id);
  if (!stage) { res.status(404).json({ error: "Stage not found." }); return; }
  const id = randomUUID();
  const {
    title, contactName, contactHandle, sourcePlatform, notes,
    socialUrl, facebookUrl, instagramUrl, xUrl, tiktokUrl, threadsUrl,
  } = parsed.data;
  await db.query(
    `UPDATE opportunities SET position = position + 1
     WHERE user_id = ? AND stage_id = ?`,
    [req.user!.id, stage.id],
  );
  await db.query(
    `INSERT INTO opportunities
       (id, user_id, pipeline_id, stage_id, title, contact_name, contact_handle,
        source_platform, status, notes, social_url, facebook_url, instagram_url,
        x_url, tiktok_url, threads_url, position, last_activity_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(3))`,
    [id, req.user!.id, stage.pipeline_id, stage.id, title,
     contactName ?? null, contactHandle ?? null, sourcePlatform ?? null,
     stage.outcome, notes ?? null,
     socialUrl ?? null, facebookUrl ?? null, instagramUrl ?? null,
     xUrl ?? null, tiktokUrl ?? null, threadsUrl ?? null],
  );
  res.status(201).json({ id });
}

export async function update(req: AuthRequest, res: Response) {
  const parsed = updateOppSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
  const fields: string[] = [];
  const vals: unknown[] = [];
  for (const [k, v] of Object.entries(parsed.data)) {
    const col = toUpdateColumn(k);
    if (col) { fields.push(`${col} = ?`); vals.push(v); }
  }
  if (!fields.length) { res.status(400).json({ error: "Nothing to update." }); return; }
  fields.push("last_activity_at = NOW(3)");
  vals.push(req.params.id, req.user!.id);
  const [r] = await db.query<any>(
    `UPDATE opportunities SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`, vals,
  );
  if (!r.affectedRows) { res.status(404).json({ error: "Not found." }); return; }
  res.json({ ok: true });
}

export async function remove(req: AuthRequest, res: Response) {
  const [r] = await db.query<any>(
    `DELETE FROM opportunities WHERE id = ? AND user_id = ?`,
    [req.params.id, req.user!.id],
  );
  if (!r.affectedRows) { res.status(404).json({ error: "Not found." }); return; }
  res.json({ ok: true });
}
