import { db } from "../lib/db";

export async function setVideoGenerating(id: string, userId: string): Promise<void> {
  await db.query(
    `UPDATE generated_content
     SET video_status = 'generating', video_started_at = NOW(),
         video_url = NULL, video_error = NULL
     WHERE id = ? AND user_id = ?`, [id, userId],
  );
}

export async function setVideoCompleted(
  id: string, userId: string, videoUrl: string, videoPrompt: string, videoModel: string,
): Promise<void> {
  if (videoUrl.length > 1024) {
    throw new Error(`video_url too large (${videoUrl.length} chars)`);
  }
  await db.query(
    `UPDATE generated_content
     SET video_status = 'completed', video_url = ?, video_prompt = ?,
         video_model = ?, video_error = NULL
     WHERE id = ? AND user_id = ?`,
    [videoUrl, videoPrompt, videoModel, id, userId],
  );
}

export async function setVideoFailed(
  id: string, userId: string, message: string,
): Promise<void> {
  await db.query(
    `UPDATE generated_content
     SET video_status = 'failed', video_error = ? WHERE id = ? AND user_id = ?`,
    [message.slice(0, 1000), id, userId],
  );
}
