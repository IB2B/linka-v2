import type { RowDataPacket } from "mysql2";
import type { GeneratedPost, ImageStatus, PostStatus } from "../types/post";
import { stripMarkdown } from "../lib/strip-markdown";

export const POST_COLS =
  `id, user_id, prompt, content, image_url, image_status, image_prompt,
   image_error, platform, scheduled_platforms, status, scheduled_for,
   posted_at, created_at, late_post_id`;

export interface PostRow extends RowDataPacket {
  id: string;
  user_id: string;
  prompt: string | null;
  content: string;
  image_url: string | null;
  image_status: ImageStatus;
  image_prompt: string | null;
  image_error: string | null;
  platform: string | null;
  scheduled_platforms: string | string[] | null;
  status: PostStatus;
  scheduled_for: Date | null;
  posted_at: Date | null;
  created_at: Date;
  late_post_id: string | null;
}

function parsePlatforms(v: string | string[] | null): string[] | null {
  if (!v) return null;
  if (Array.isArray(v)) return v;
  try { const p = JSON.parse(v); return Array.isArray(p) ? p : null; }
  catch { return null; }
}

export function rowToPost(r: PostRow): GeneratedPost {
  return {
    id: r.id, userId: r.user_id, prompt: r.prompt, content: stripMarkdown(r.content),
    imageUrl: r.image_url, imageStatus: r.image_status,
    imagePrompt: r.image_prompt, imageError: r.image_error,
    platform: r.platform,
    scheduledPlatforms: parsePlatforms(r.scheduled_platforms),
    status: r.status,
    scheduledFor: r.scheduled_for ? r.scheduled_for.toISOString() : null,
    postedAt: r.posted_at ? r.posted_at.toISOString() : null,
    createdAt: r.created_at.toISOString(),
    latePostId: r.late_post_id,
  };
}
