import { db } from "./db";
import { purgeUser } from "./user-purge";

// Deleted accounts are normally purged the moment they are deleted. This
// catches the ones whose purge failed (a provider was down, the server
// restarted mid-way) and retries them until they are gone.
const SWEEP_MS = 6 * 60 * 60 * 1000;

let running = false;
let timer: NodeJS.Timeout | null = null;

async function runOnce(): Promise<void> {
  if (running) return;
  running = true;
  try {
    const [rows] = await db.query<any[]>(
      "SELECT id FROM users WHERE deleted_at IS NOT NULL ORDER BY deleted_at LIMIT 100",
    );
    for (const { id } of rows) {
      await purgeUser(id).catch((e) => console.error("[deleted-users-sweeper]", id, e));
    }
  } catch (err) {
    console.error("[deleted-users-sweeper]", err);
  } finally {
    running = false;
  }
}

// Production only: a dev machine often holds real provider keys next to a copy
// of old data, and must not start erasing accounts at Late/HeyGen on boot.
export function startDeletedUsersSweeper(): void {
  if (timer) return;
  if (process.env.NODE_ENV !== "production") return;
  void runOnce();
  timer = setInterval(() => { void runOnce(); }, SWEEP_MS);
}
