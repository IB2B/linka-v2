import { ImageIcon } from "lucide-react";

import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PostStatusBadge } from "./post-status-badge";
import { PostImagePlaceholder } from "./post-image-placeholder";
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
  const isLoading =
    post.imageStatus === "pending" || post.imageStatus === "generating";
  const hasImage = !!post.imageUrl;

  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden bg-muted">
      {hasImage ? (
        <img
          src={post.imageUrl ?? ""}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover/post:scale-[1.04]"
        />
      ) : isLoading ? (
        <div className="relative size-full">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex size-full flex-col items-center justify-center gap-2">
            <ImageIcon className="size-5 text-muted-foreground/50" />
            <span className="text-xs font-medium text-muted-foreground">
              {post.imageStatus === "pending" ? "Image queued…" : "Generating image…"}
            </span>
          </div>
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

      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent" />

      <div className="absolute left-2 top-2">
        <PostStatusBadge status={post.status} />
      </div>
      {platform ? (
        <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm ring-1 ring-white/10">
          <PlatformIcon platform={platform} className="size-2.5" />
          <span className="capitalize">{platform}</span>
        </div>
      ) : null}
    </div>
  );
}
