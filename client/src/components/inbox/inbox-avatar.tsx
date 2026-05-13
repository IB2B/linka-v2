"use client";

import { cn } from "@/lib/utils";

type Props = {
  name: string;
  src: string | null;
  username?: string | null;
  platform?: string;
  size?: "sm" | "md";
};

function resolveAvatar(src: string | null, username: string | null | undefined, platform: string | undefined) {
  if (src) return src;
  if (username && platform === "instagram") return `https://unavatar.io/instagram/${username}`;
  if (username && platform === "facebook") return `https://unavatar.io/facebook/${username}`;
  if (username && platform === "twitter") return `https://unavatar.io/twitter/${username}`;
  if (username) return `https://unavatar.io/${username}`;
  return null;
}

export function InboxAvatar({ name, src, username, platform, size = "md" }: Props) {
  const sizeClass = size === "sm" ? "size-7 text-xs" : "size-9 text-sm";
  const initial = name.trim().slice(0, 1).toUpperCase() || "?";
  const avatar = resolveAvatar(src, username, platform);

  return (
    <div className={cn(
      "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground",
      sizeClass,
    )}>
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar} alt="" className="h-full w-full object-cover"
          onError={(e) => { e.currentTarget.src = "/default-avatar.svg"; }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/default-avatar.svg" alt="" className="h-full w-full object-cover" />
      )}
    </div>
  );
}
