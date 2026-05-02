import { PLATFORMS } from "@/lib/zernio/platforms";
import type { Platform } from "@/lib/zernio/zernio-account.types";

export type InboxPlatformOption = {
  value: "" | Platform;
  label: string;
  color: string | null;
};

const SUPPORTED: Platform[] = [
  "linkedin",
  "instagram",
  "facebook",
  "twitter",
  "threads",
  "reddit",
];

export const INBOX_PLATFORMS: InboxPlatformOption[] = [
  { value: "", label: "All", color: null },
  ...SUPPORTED.map((slug) => {
    const meta = PLATFORMS.find((p) => p.slug === slug)!;
    return { value: slug, label: meta.label, color: meta.color };
  }),
];
