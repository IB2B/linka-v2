import { lateFetch } from "./late-api";
import { resolvePublicImageUrl } from "./late-media";
import type { GeneratedPost } from "../types/post";
import type { PlatformEntry } from "./late-accounts";

export type LateScheduleResult = { latePostId: string };
export type LatePublishResult = { latePostId: string };
type CreateResult = { post: { _id: string } };

async function buildBody(post: GeneratedPost, platforms: PlatformEntry[]) {
  const body: Record<string, unknown> = { content: post.content, platforms };
  const url = await resolvePublicImageUrl(post.imageUrl);
  if (url) body.mediaItems = [{ type: "image", url }];
  return body;
}

export async function publishPostOnLate(
  post: GeneratedPost, platforms: PlatformEntry[],
): Promise<LatePublishResult> {
  const base = await buildBody(post, platforms);
  const r = await lateFetch<CreateResult>("/posts", {
    method: "POST",
    body: JSON.stringify({ ...base, publishNow: true }),
  });
  return { latePostId: r.post._id };
}

export async function schedulePostOnLate(
  post: GeneratedPost, when: Date, platforms: PlatformEntry[],
): Promise<LateScheduleResult> {
  const base = await buildBody(post, platforms);
  const r = await lateFetch<CreateResult>("/posts", {
    method: "POST",
    body: JSON.stringify({
      ...base, scheduledFor: when.toISOString(), timezone: "UTC",
    }),
  });
  return { latePostId: r.post._id };
}
