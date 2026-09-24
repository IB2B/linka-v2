import { resumeStuckImageJobs } from "./image-reaper";
import { startSocialEngagementPoller } from "./social-engagement-poller";
import { startScheduledPostsPoller } from "./scheduled-posts-poller";
import { startDeletedUsersSweeper } from "./deleted-users-sweeper";

export function startBackgroundJobs(): void {
  resumeStuckImageJobs().catch((e) => console.error("[image-reaper]", e));
  startSocialEngagementPoller();
  startScheduledPostsPoller();
  startDeletedUsersSweeper();
}
