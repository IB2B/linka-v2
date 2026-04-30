import { MessageCircle } from "lucide-react";

import { PlatformIcon } from "@/components/accounts/platform-icon";
import type { Platform } from "@/lib/zernio/zernio-account.types";

const KNOWN: Platform[] = [
  "linkedin", "facebook", "instagram", "twitter",
  "threads", "tiktok", "pinterest", "bluesky", "reddit",
];

type Props = { platform: string; className?: string };

export function PlatformBadge({ platform, className }: Props) {
  if ((KNOWN as string[]).includes(platform)) {
    return <PlatformIcon platform={platform as Platform} className={className} />;
  }
  return <MessageCircle className={className} aria-hidden />;
}
