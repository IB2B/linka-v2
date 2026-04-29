import type { GeneratedPost, ImageStatus, PostStatus } from "../types/post";

export const POST_COLS =
  `id, user_id, prompt, content, image_url, image_status, image_prompt,
   image_error, platform, status, scheduled_for, posted_at, created_at`;

export type PostRow = {
  id: string;
  user_id: string;
  prompt: string | null;
  content: string;
  image_url: string | null;
  image_status: ImageStatus;
  image_prompt: string | null;
  image_error: string | null;
  platform: string | null;
  status: PostStatus;
  scheduled_for: Date | null;
  posted_at: Date | null;
  created_at: Date;
};

export function rowToPost(r: PostRow): GeneratedPost {
  return {
    id: r.id,
    userId: r.user_id,
    prompt: r.prompt,
    content: r.content,
    imageUrl: r.image_url,
    imageStatus: r.image_status,
    imagePrompt: r.image_prompt,
    imageError: r.image_error,
    platform: r.platform,
    status: r.status,
    scheduledFor: r.scheduled_for ? r.scheduled_for.toISOString() : null,
    postedAt: r.posted_at ? r.posted_at.toISOString() : null,
    createdAt: r.created_at.toISOString(),
  };
}
