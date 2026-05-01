import type { Response } from "express";

import { db } from "../lib/db";
import { mapStage, mapOpp } from "../lib/pipelines";
import type { AuthRequest } from "../middleware/auth";

export async function getBoard(req: AuthRequest, res: Response) {
  const userId = req.user!.id;

  const [pipeRows] = await db.query<any[]>(
    `SELECT id, name, is_default FROM pipelines
     WHERE user_id = ? ORDER BY is_default DESC, created_at ASC LIMIT 1`,
    [userId],
  );
  if (!pipeRows.length) { res.json({ pipeline: null, stages: [], opportunities: [] }); return; }
  const pipeline = { id: pipeRows[0].id, name: pipeRows[0].name, isDefault: !!pipeRows[0].is_default };

  const [stageRows, oppRows] = await Promise.all([
    db.query<any[]>(
      `SELECT id, name, position, outcome FROM pipeline_stages
       WHERE pipeline_id = ? ORDER BY position ASC`,
      [pipeline.id],
    ),
    db.query<any[]>(
      `SELECT id, pipeline_id, stage_id, title, contact_name, contact_handle,
              source_platform, status, notes, conversation_id, position,
              last_activity_at, created_at, updated_at
       FROM opportunities
       WHERE user_id = ? AND pipeline_id = ?
       ORDER BY position ASC, created_at ASC`,
      [userId, pipeline.id],
    ),
  ]);

  res.json({
    pipeline,
    stages: stageRows[0].map(mapStage),
    opportunities: oppRows[0].map(mapOpp),
  });
}
