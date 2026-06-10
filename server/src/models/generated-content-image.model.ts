import { db } from "../lib/db";

export async function setImageGenerating(id: string, userId: string): Promise<void> {
  await db.query(
    `UPDATE generated_content
     SET image_status = 'generating', image_started_at = NOW(),
         image_url = NULL, image_error = NULL
     WHERE id = ? AND user_id = ?`, [id, userId],
  );
}

export async function setImageCompleted(
  id: string, userId: string, imageUrl: string, imagePrompt: string, imageModel: string,
): Promise<void> {
  if (imageUrl.length > 8192) {
    throw new Error(`image_url too large (${imageUrl.length} chars)`);
  }
  await db.query(
    `UPDATE generated_content
     SET image_status = 'completed', image_url = ?, image_prompt = ?,
         image_model = ?, image_error = NULL
     WHERE id = ? AND user_id = ?`,
    [imageUrl, imagePrompt, imageModel, id, userId],
  );
}

export async function setImageFailed(
  id: string, userId: string, message: string,
): Promise<void> {
  await db.query(
    `UPDATE generated_content
     SET image_status = 'failed', image_error = ? WHERE id = ? AND user_id = ?`,
    [message.slice(0, 1000), id, userId],
  );
}
