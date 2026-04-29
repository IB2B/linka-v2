// Stub for the Late posting API. Replace with real fetch to https://getlate.dev/api/v1
// when LATE_API_KEY is provisioned.
import type { GeneratedPost } from "../types/post";

export type LateScheduleResult = { latePostId: string };
export type LatePublishResult = { latePostId: string };

export async function schedulePostOnLate(
  _post: GeneratedPost, _scheduledFor: Date,
): Promise<LateScheduleResult> {
  return { latePostId: `stub-${Date.now()}` };
}

export async function publishPostOnLate(
  _post: GeneratedPost,
): Promise<LatePublishResult> {
  return { latePostId: `stub-now-${Date.now()}` };
}
