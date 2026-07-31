import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { setVideoGenerating } from "../models/generated-content-video.model";
import { videoKindOf } from "../lib/video-kind";
import { checkVideoRateLimit } from "../lib/video-rate-limiter";
import { generateAvatarVideoInBackground }
  from "../services/avatar-video.service";
import { generateVideoForPostInBackground }
  from "../services/video-generation.service";

const schema = z.object({
  avatarAspect: z.enum(["auto", "16:9", "9:16", "4:5", "1:1"]).optional(),
  avatarSeconds: z.union([z.literal(30), z.literal(60), z.literal(120)]).optional(),
});

// Re-renders the video on an existing post. Without this a bad render — wrong
// framing, a failed job — is permanent, because regenerate-text leaves the old
// MP4 attached and there was no other way to replace it.
export async function regenerateVideo(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const parsed = schema.safeParse(req.body ?? {});
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }
    const id = req.params.id as string;
    const userId = req.user!.id;
    const post = await posts.findById(id, userId);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    if (post.status === "posted") {
      res.status(400).json({ error: "Already posted." }); return;
    }
    if (post.videoStatus === "skipped") {
      res.status(400).json({ error: "This post has no video." }); return;
    }
    if (post.videoStatus === "generating" || post.videoStatus === "pending") {
      res.status(409).json({ error: "A render is already in progress." }); return;
    }
    const limit = checkVideoRateLimit(userId);
    if (!limit.allowed) {
      res.status(429).json({
        error: "Daily video limit reached. Try again tomorrow.",
      });
      return;
    }
    const kind = await videoKindOf(id, userId);
    // Clears video_url and video_error, so the UI drops straight back to the
    // rendering state rather than showing the stale MP4 next to a spinner.
    await setVideoGenerating(id, userId);
    const platform = post.platform ?? "linkedin";
    if (kind === "avatar") {
      void generateAvatarVideoInBackground(id, userId, post.content, platform, {
        aspect: parsed.data.avatarAspect,
        seconds: parsed.data.avatarSeconds,
      });
    } else {
      void generateVideoForPostInBackground(id, userId, post.content, platform);
    }
    res.json({ ok: true, kind });
  } catch (e) { next(e); }
}
