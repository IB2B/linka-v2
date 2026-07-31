import { ImageIcon, Play } from "lucide-react";

import { PlatformIcon } from "@/components/accounts/platform-icon";
import { FallbackImage } from "@/components/media/fallback-image";
import { PostImagePlaceholder } from "./post-image-placeholder";
import { ShimmerOverlay } from "./shimmer-overlay";
import { getPlatformGradient } from "./platform-gradient";
import type { GeneratedPost } from "@/types/post";
import type { Platform } from "@/lib/zernio/zernio-account.types";

const KNOWN: Platform[] = [
  "linkedin", "facebook", "instagram", "twitter", "threads",
  "tiktok", "pinterest", "bluesky", "reddit",
];

function asPlatform(p: string | null): Platform | null {
  return p && (KNOWN as string[]).includes(p) ? (p as Platform) : null;
}

export function PostCardMedia({ post }: { post: GeneratedPost }) {
  const platform = asPlatform(post.platform);
  const videoLoading =
    post.videoStatus === "pending" || post.videoStatus === "generating";
  const isLoading = videoLoading
    || post.imageStatus === "pending" || post.imageStatus === "generating";
  const hasImage = !!post.imageUrl;
  const label = videoLoading
    ? (post.videoStatus === "pending" ? "Video queued…" : "Rendering video…")
    : (post.imageStatus === "pending" ? "Image queued…" : "Generating image…");

  return (
    <div className="relative size-full overflow-hidden bg-muted">
      {hasImage ? (
        <FallbackImage
          src={post.imageUrl ?? ""}
          className="size-full object-cover transition-transform duration-500 group-hover/post:scale-[1.04]"
          fallback={<PostImagePlaceholder />}
        />
      ) : isLoading ? (
        <div className="relative size-full overflow-hidden">
          <ShimmerOverlay className="via-white/20" />
          <div className="relative flex size-full flex-col items-center justify-center gap-2">
            {videoLoading
              ? <Play className="size-5 text-muted-foreground/50" />
              : <ImageIcon className="size-5 text-muted-foreground/50" />}
            <span className="text-xs font-medium text-muted-foreground">
              {label}
            </span>
          </div>
        </div>
      ) : post.videoUrl ? (
        <div className="flex size-full items-center justify-center bg-black/80">
          <Play className="size-8 text-white/70" />
        </div>
      ) : post.imageStatus === "failed" ? (
        <PostImagePlaceholder />
      ) : (
        <div className={`flex size-full items-center justify-center bg-gradient-to-br ${getPlatformGradient(platform)}`}>
          {platform ? (
            <PlatformIcon platform={platform} className="size-9 text-foreground/20" />
          ) : (
            <ImageIcon className="size-7 text-muted-foreground/30" />
          )}
        </div>
      )}

    </div>
  );
}
