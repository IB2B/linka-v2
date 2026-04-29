import { db } from "./db";

// On boot, mark in-flight image jobs as failed. They cannot resume after a
// process restart (state lives only in memory) and would otherwise leave
// rows stuck in 'pending'/'generating' forever and the client polling.
export async function reapStuckImageJobs(): Promise<void> {
  const [r] = await db.query<any>(
    `UPDATE generated_content
     SET image_status = 'failed', image_error = 'interrupted by server restart'
     WHERE image_status IN ('pending','generating')`,
  );
  const n = (r as any).affectedRows ?? 0;
  if (n > 0) console.log(`[image-reaper] marked ${n} stuck job(s) as failed`);
}
