import { db } from "./db";
import { setImageFailed } from "../models/generated-content-image.model";
import { generateImageForPostInBackground }
  from "../services/image-generation.service";

// Jobs that entered 'generating' more than this ago are treated as abandoned
// (the server was down long enough that resuming is pointless) and failed.
const STALE_MS = 30 * 60 * 1000;

type StuckRow = {
  id: string; user_id: string; content: string;
  platform: string | null; image_prompt: string | null;
  image_started_at: Date | null;
};

// On boot the in-memory image jobs are gone. Rather than fail every in-flight
// row, re-launch the ones that were started recently (common in dev where
// `tsx watch` restarts mid-generation) and only fail the genuinely stale ones.
export async function resumeStuckImageJobs(): Promise<void> {
  const [rows] = await db.query<any>(
    `SELECT id, user_id, content, platform, image_prompt, image_started_at
     FROM generated_content WHERE image_status IN ('pending','generating')`,
  );
  const stuck = rows as StuckRow[];
  if (stuck.length === 0) return;

  let resumed = 0, failed = 0;
  for (const row of stuck) {
    const startedAt = row.image_started_at?.getTime() ?? 0;
    if (Date.now() - startedAt > STALE_MS) {
      await setImageFailed(row.id, row.user_id, "abandoned before restart")
        .catch(() => {});
      failed += 1;
      continue;
    }
    void generateImageForPostInBackground(
      row.id, row.user_id, row.content,
      row.platform ?? "linkedin", row.image_prompt ?? undefined,
    );
    resumed += 1;
  }
  console.log(`[image-reaper] resumed ${resumed}, failed ${failed} stuck job(s)`);
}
