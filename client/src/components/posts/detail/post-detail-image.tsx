"use client";

import { ImageIcon, AlertTriangle, Sparkles } from "lucide-react";
import { useRegen } from "./regen-context";
import type { GeneratedPost } from "@/types/post";

export function PostDetailImage({ post }: { post: GeneratedPost }) {
  const { imagePending } = useRegen();
  if (post.imageStatus === "skipped" && !imagePending) return null;

  const inflight =
    imagePending ||
    post.imageStatus === "pending" ||
    post.imageStatus === "generating";

  if (inflight) {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border bg-muted">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="flex flex-col items-center gap-2">
          <Sparkles className="size-6 animate-pulse text-foreground/60" />
          <span className="text-sm font-medium text-foreground/80">
            {imagePending ? "Queuing image…" : "Generating image…"}
          </span>
          <span className="text-xs text-muted-foreground">10–30 s</span>
        </div>
      </div>
    );
  }

  if (post.imageUrl) {
    return (
      <a href={post.imageUrl} target="_blank" rel="noreferrer"
        className="block overflow-hidden rounded-lg border bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.imageUrl} alt="" className="w-full object-contain" />
      </a>
    );
  }

  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive">
      <AlertTriangle className="size-6" />
      <span className="text-sm font-medium">Image generation failed</span>
      {post.imageError ? (
        <span className="max-w-md px-4 text-center text-xs text-destructive/80">
          {post.imageError}
        </span>
      ) : null}
    </div>
  );
}
