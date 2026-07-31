import { db } from "./db";
import type { RowDataPacket } from "mysql2";

type Row = RowDataPacket & { video_model: string | null };

// video_model is the only record of which pipeline produced a post's video: the
// avatar service writes "heygen:<engine>", the b-roll service writes the raw
// image-to-video model name. Not in POST_COLS, so it is read on demand.
export async function videoKindOf(
  id: string, userId: string,
): Promise<"avatar" | "broll"> {
  const [rows] = await db.query<Row[]>(
    `SELECT video_model FROM generated_content
      WHERE id = ? AND user_id = ? LIMIT 1`,
    [id, userId],
  );
  const model = rows[0]?.video_model ?? null;
  // A failed first attempt can leave video_model NULL. Avatar is the safe guess:
  // b-roll needs a seed image, which a videoless post will not have.
  return model && !model.startsWith("heygen:") ? "broll" : "avatar";
}
