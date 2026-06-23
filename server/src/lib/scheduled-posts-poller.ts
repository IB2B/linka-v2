import { findUsersWithDuePosts } from "./scheduled-posts-due-users";
import { syncScheduledPosts } from "./sync-scheduled";

// How often to check for due scheduled posts. 60s gives near-real-time
// "post published" / "post failed" emails without hammering Late, since the
// query is empty whenever nobody has a post due.
const POLL_MS = (() => {
  const n = Number(process.env.SCHEDULED_POLL_MS);
  return Number.isFinite(n) && n > 0 ? n : 60_000;
})();

let running = false;
let timer: NodeJS.Timeout | null = null;

async function runOnce(): Promise<void> {
  if (running) return;
  running = true;
  try {
    const userIds = await findUsersWithDuePosts();
    for (const userId of userIds) {
      await syncScheduledPosts(userId)
        .catch((e) => console.error("[scheduled-poller] sync", userId, e));
    }
  } catch (err) {
    console.error("[scheduled-posts-poller]", err);
  } finally {
    running = false;
  }
}

export function startScheduledPostsPoller(): void {
  if (timer) return;
  if (process.env.NODE_ENV === "test") return;
  void runOnce();
  timer = setInterval(() => { void runOnce(); }, POLL_MS);
}
