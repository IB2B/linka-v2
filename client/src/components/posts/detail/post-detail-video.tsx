"use client";

import { AlertTriangle } from "lucide-react";
import { VideoRendering } from "./video-rendering";
import type { GeneratedPost } from "@/types/post";

// Video renders take minutes, not seconds — state that up front, or the wait
// reads as a broken page.
export function PostDetailVideo({ post }: { post: GeneratedPost }) {
  if (post.videoStatus === "skipped") return null;

  const inflight =
    post.videoStatus === "pending" || post.videoStatus === "generating";

  if (inflight) {
    return <VideoRendering queued={post.videoStatus === "pending"} />;
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
