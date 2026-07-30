"use client";

import { AlertTriangle, Clapperboard } from "lucide-react";
import type { GeneratedPost } from "@/types/post";

// Video renders take minutes, not seconds — state that up front, or the wait
// reads as a broken page.
export function PostDetailVideo({ post }: { post: GeneratedPost }) {
  if (post.videoStatus === "skipped") return null;

  const inflight =
    post.videoStatus === "pending" || post.videoStatus === "generating";

  if (inflight) {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border bg-muted">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <Clapperboard className="size-6 animate-pulse text-foreground/60" />
          <span className="text-sm font-medium text-foreground/80">
            {post.videoStatus === "pending" ? "Queuing video…" : "Rendering video…"}
          </span>
          <span className="text-xs text-muted-foreground">
            1–3 min · safe to leave this page, it keeps rendering
          </span>
        </div>
      </div>
    );
  }

  if (post.videoUrl) {
    return (
      <video
        src={post.videoUrl}
        poster={post.imageUrl ?? undefined}
        controls
        playsInline
        preload="metadata"
        className="w-full rounded-lg border bg-black"
      />
    );
  }

  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive">
      <AlertTriangle className="size-6" />
      <span className="text-sm font-medium">Video generation failed</span>
      {post.videoError ? (
        <span className="max-w-md px-4 text-center text-xs text-destructive/80">
          {post.videoError}
        </span>
      ) : null}
    </div>
  );
}
