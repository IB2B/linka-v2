import type { Response } from "express";

import { db } from "../lib/db";
import { mapStage, mapOpp } from "../lib/pipelines";
import type { AuthRequest } from "../middleware/auth";

type PipeRow = { id: string; name: string; is_default: 0 | 1 };

export async function getBoard(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const wanted = typeof req.query.pipelineId === "string" ? req.query.pipelineId : null;

  const [allRows] = await db.query<any[]>(
    `SELECT id, name, is_default FROM pipelines
     WHERE user_id = ? ORDER BY is_default DESC, created_at ASC`,
    [userId],
  );
  const pipelines = (allRows as PipeRow[]).map((r) => ({
    id: r.id, name: r.name, isDefault: !!r.is_default,
  }));
  if (!pipelines.length) {
    res.json({ pipelines: [], pipeline: null, stages: [], opportunities: [] });
    return;
  }
  const active = pipelines.find((p) => p.id === wanted) ?? pipelines[0];

  const [stageRows, oppRows] = await Promise.all([
    db.query<any[]>(
      `SELECT id, name, position, outcome FROM pipeline_stages
       WHERE pipeline_id = ? ORDER BY position ASC`,
      [active.id],
    ),
    db.query<any[]>(
      `SELECT id, pipeline_id, stage_id, title, contact_name, contact_handle,
              source_platform, status, notes, conversation_id, social_url,
              facebook_url, instagram_url, x_url, tiktok_url, threads_url,
              position, last_activity_at, created_at, updated_at
       FROM opportunities
       WHERE user_id = ? AND pipeline_id = ?
       ORDER BY position ASC, created_at ASC`,
      [userId, active.id],
    ),
  ]);

  res.json({
    pipelines,
    pipeline: active,
    stages: stageRows[0].map(mapStage),
    opportunities: oppRows[0].map(mapOpp),
  });
}
