import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORMS } from "@/lib/zernio/platforms";
import type { Platform } from "@/lib/zernio/zernio-account.types";
import { CommentAvatarCore } from "./comment-avatar-core";

type Props = { name: string; src: string | null; platform: string };

export function CommentAvatar({ name, src, platform }: Props) {
  const meta = PLATFORMS.find((p) => p.slug === platform);
  return (
    <div className="relative size-9 shrink-0">
      <CommentAvatarCore name={name} src={src} size={36} />
      {meta && (
        <span
          className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full ring-2 ring-card"
          style={{ backgroundColor: meta.color }}
        >
          <PlatformIcon platform={platform as Platform} className="size-2.5 text-white" />
        </span>
      )}
    </div>
  );
}
