import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORMS } from "@/lib/zernio/platforms";
import type { Platform } from "@/lib/zernio/zernio-account.types";
import type { GeneratedPost } from "@/types/post";

export function PostedPlatforms({ post }: { post: GeneratedPost }) {
  const platforms = (post.scheduledPlatforms ?? (post.platform ? [post.platform] : [])) as Platform[];
  if (platforms.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {platforms.map((slug) => {
        const meta = PLATFORMS.find((p) => p.slug === slug);
        return (
          <span
            key={slug}
            className="inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 text-sm font-medium"
          >
            <PlatformIcon platform={slug} className="size-4" />
            {meta?.label ?? slug}
          </span>
        );
      })}
    </div>
  );
}
