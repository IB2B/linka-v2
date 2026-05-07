import { PLATFORMS, platformsWithDMs } from "@/lib/zernio/platforms";

export type InboxPlatformOption = {
  value: "" | string;
  label: string;
  color: string | null;
};

export const INBOX_PLATFORMS: InboxPlatformOption[] = [
  { value: "", label: "All", color: null },
  ...platformsWithDMs().map((slug) => {
    const meta = PLATFORMS.find((p) => p.slug === slug)!;
    return { value: slug, label: meta.label, color: meta.color };
  }),
];
