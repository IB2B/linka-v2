import { lateFetch } from "./late-api";
import { resolvePublicImageUrl } from "./late-media";
import { stripMarkdown } from "./strip-markdown";
import type { GeneratedPost } from "../types/post";
import type { PlatformEntry } from "./late-accounts";

export type LateScheduleResult = { latePostId: string };
export type PlatformResult = { platform: string; status: string; error: string | null };
export type LatePublishResult = { latePostId: string; results: PlatformResult[] };
type CreateResult = { post: { _id: string }; platformResults?: PlatformResult[] };

async function buildBody(post: GeneratedPost, platforms: PlatformEntry[]) {
  const body: Record<string, unknown> = {
    content: stripMarkdown(post.content), platforms,
  };
  // Video takes precedence over the poster image when both are present.
  if (post.videoStatus === "completed" && /^https:\/\//i.test(post.videoUrl ?? "")) {
    body.mediaItems = [{ type: "video", url: post.videoUrl }];
    return body;
  }
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
  return { latePostId: r.post._id, results: r.platformResults ?? [] };
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

export async function deleteLatePost(latePostId: string): Promise<void> {
  await lateFetch(`/posts/${encodeURIComponent(latePostId)}`, { method: "DELETE" });
}
