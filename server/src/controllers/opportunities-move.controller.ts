import type { Response } from "express";

import { db } from "../lib/db";
import { moveOppSchema, loadStage } from "../lib/pipelines";
import type { AuthRequest } from "../middleware/auth";

export async function move(req: AuthRequest, res: Response) {
  const parsed = moveOppSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
  const stage = await loadStage(parsed.data.stageId, req.user!.id);
  if (!stage) { res.status(404).json({ error: "Stage not found." }); return; }
  const { position } = parsed.data;
  await db.query(
    `UPDATE opportunities SET position = position + 1
     WHERE user_id = ? AND stage_id = ? AND position >= ? AND id <> ?`,
    [req.user!.id, stage.id, position, req.params.id],
  );
  const [r] = await db.query<any>(
    `UPDATE opportunities
     SET stage_id = ?, position = ?, status = ?, last_activity_at = NOW(3)
     WHERE id = ? AND user_id = ?`,
    [stage.id, position, stage.outcome, req.params.id, req.user!.id],
  );
  if (!r.affectedRows) { res.status(404).json({ error: "Not found." }); return; }
  res.json({ ok: true });
}
