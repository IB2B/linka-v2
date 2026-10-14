"use client";

import { useLocale, useTranslations } from "next-intl";
import { UsageLimitRow } from "@/components/generate/usage-limit-row";
import type { UsageSummary } from "@/types/usage";

// One row per quota. Videos show a short note when the plan doesn't include them.
export function UsagePanelRows({ usage }: { usage: UsageSummary }) {
  const t = useTranslations("dashboard.usageMenu");
  const fmt = new Intl.NumberFormat(useLocale());
  const { posts, images, videos } = usage;
  const value = (used: number, limit: number) =>
    t("left", { left: fmt.format(Math.max(0, limit - used)), limit: fmt.format(limit) });

  return (
    <div className="space-y-3 px-2 py-3">
      <UsageLimitRow label={t("posts")} used={posts.used} limit={posts.limit}
        value={value(posts.used, posts.limit)} />
      <UsageLimitRow label={t("images")} used={images.used} limit={images.limit}
        value={value(images.used, images.limit)} />
      {videos.allowed ? (
        <UsageLimitRow label={t("videos")} used={videos.used} limit={videos.limit}
          value={value(videos.used, videos.limit)} />
      ) : (
        <p className="text-xs text-muted-foreground">{t("videosLocked")}</p>
      )}
    </div>
  );
}
