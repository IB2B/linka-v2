import type { Response } from "express";
import { randomUUID } from "node:crypto";

import { db } from "../lib/db";
import {
  createStageSchema, updateStageSchema,
  loadDefaultPipeline, loadOwnedStage,
} from "../lib/stages";
import type { AuthRequest } from "../middleware/auth";

export async function createStage(req: AuthRequest, res: Response) {
  const parsed = createStageSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
  const pipeline = await loadDefaultPipeline(req.user!.id);
  if (!pipeline) { res.status(404).json({ error: "No pipeline yet." }); return; }
  const [posRows] = await db.query<any[]>(
    `SELECT COALESCE(MAX(position), -1) + 1 AS pos FROM pipeline_stages WHERE pipeline_id = ?`,
    [pipeline.id],
  );
  const id = randomUUID();
  await db.query(
    `INSERT INTO pipeline_stages (id, pipeline_id, name, position, outcome) VALUES (?, ?, ?, ?, ?)`,
    [id, pipeline.id, parsed.data.name, posRows[0].pos, parsed.data.outcome ?? "open"],
  );
  res.status(201).json({ id });
}

export async function updateStage(req: AuthRequest, res: Response) {
  const parsed = updateStageSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
  const stage = await loadOwnedStage(req.params.id, req.user!.id);
  if (!stage) { res.status(404).json({ error: "Not found." }); return; }
  const fields: string[] = [];
  const vals: unknown[] = [];
  if (parsed.data.name !== undefined) { fields.push("name = ?"); vals.push(parsed.data.name); }
  if (parsed.data.outcome !== undefined) { fields.push("outcome = ?"); vals.push(parsed.data.outcome); }
  if (!fields.length) { res.status(400).json({ error: "Nothing to update." }); return; }
  vals.push(stage.id);
  await db.query(`UPDATE pipeline_stages SET ${fields.join(", ")} WHERE id = ?`, vals);
  if (parsed.data.outcome !== undefined) {
    await db.query(
      `UPDATE opportunities SET status = ? WHERE stage_id = ?`,
      [parsed.data.outcome, stage.id],
    );
  }
  res.json({ ok: true });
}

export async function removeStage(req: AuthRequest, res: Response) {
  const stage = await loadOwnedStage(req.params.id, req.user!.id);
  if (!stage) { res.status(404).json({ error: "Not found." }); return; }
  const [oppRows] = await db.query<any[]>(
    `SELECT COUNT(*) AS c FROM opportunities WHERE stage_id = ?`,
    [stage.id],
  );
  if (oppRows[0].c > 0) {
    res.status(400).json({ error: "Move or delete this stage's opportunities first." });
    return;
  }
  await db.query(`DELETE FROM pipeline_stages WHERE id = ?`, [stage.id]);
  res.json({ ok: true });
}
