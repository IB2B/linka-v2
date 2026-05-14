import { db } from "./db";

export { createOppSchema, updateOppSchema, moveOppSchema } from "./opp-schemas";

export function mapStage(r: any) {
  return { id: r.id, name: r.name, position: r.position, outcome: r.outcome };
}

export function mapOpp(r: any) {
  return {
    id: r.id, pipelineId: r.pipeline_id, stageId: r.stage_id,
    title: r.title,
    contactName: r.contact_name, contactHandle: r.contact_handle,
    sourcePlatform: r.source_platform,
    status: r.status, notes: r.notes,
    conversationId: r.conversation_id,
    socialUrl: r.social_url ?? null,
    facebookUrl: r.facebook_url ?? null,
    instagramUrl: r.instagram_url ?? null,
    xUrl: r.x_url ?? null,
    tiktokUrl: r.tiktok_url ?? null,
    threadsUrl: r.threads_url ?? null,
    position: r.position,
    lastActivityAt: r.last_activity_at,
    createdAt: r.created_at, updatedAt: r.updated_at,
  };
}

const COL_MAP: Record<string, string> = {
  title: "title",
  contactName: "contact_name",
  contactHandle: "contact_handle",
  sourcePlatform: "source_platform",
  notes: "notes",
  socialUrl: "social_url",
  facebookUrl: "facebook_url",
  instagramUrl: "instagram_url",
  xUrl: "x_url",
  tiktokUrl: "tiktok_url",
  threadsUrl: "threads_url",
};

export function toUpdateColumn(key: string): string | null {
  return COL_MAP[key] ?? null;
}

export async function loadStage(stageId: string, userId: string) {
  const [rows] = await db.query<any[]>(
    `SELECT s.id, s.pipeline_id, s.outcome FROM pipeline_stages s
     JOIN pipelines p ON p.id = s.pipeline_id
     WHERE s.id = ? AND p.user_id = ?`,
    [stageId, userId],
  );
  return rows[0] ?? null;
}
