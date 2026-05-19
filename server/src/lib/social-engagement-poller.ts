import { detectEngagementDeltas } from "./social-engagement-detect";
import { insertEngagementEvents } from "./social-engagement-insert";
import { emailHighVolumeDigest } from "./social-engagement-email";
import { POLL_MS } from "./social-engagement-config";

let running = false;
let timer: NodeJS.Timeout | null = null;

async function runOnce(): Promise<void> {
  if (running) return;
  running = true;
  try {
    const detected = await detectEngagementDeltas();
    if (detected.length === 0) return;
    const inserted = await insertEngagementEvents(detected);
    if (inserted.length === 0) return;
    await emailHighVolumeDigest(inserted);
  } catch (err) {
    console.error("[social-engagement-poller]", err);
  } finally {
    running = false;
  }
}

export function startSocialEngagementPoller(): void {
  if (timer) return;
  if (process.env.NODE_ENV === "test") return;
  void runOnce();
  timer = setInterval(() => { void runOnce(); }, POLL_MS);
}
