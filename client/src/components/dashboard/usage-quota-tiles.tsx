"use client";

import { FileText, Image as ImageIcon, Video } from "lucide-react";
import { useTranslations } from "next-intl";

import { UsageQuotaTile } from "./usage-quota-tile";
import type { UsageSummary } from "@/types/usage";

// Posts, images and videos side by side, each as a ring tile.
export function UsageQuotaTiles({ usage }: { usage: UsageSummary }) {
  const t = useTranslations("dashboard.usagePlan");
  const { posts, images, videos } = usage;
  const detail = (used: number, limit: number) => t("detail", { used, limit });

  return (
    <div className="grid grid-cols-3 gap-1.5">
      <UsageQuotaTile icon={FileText} label={t("posts")} used={posts.used}
        limit={posts.limit} detail={detail(posts.used, posts.limit)} />
      <UsageQuotaTile icon={ImageIcon} label={t("images")} used={images.used}
        limit={images.limit} detail={detail(images.used, images.limit)} />
      <UsageQuotaTile icon={Video} label={t("videos")} used={videos.used}
        limit={videos.limit}
        detail={videos.allowed ? detail(videos.used, videos.limit) : t("videosLocked")}
        locked={videos.allowed ? undefined : t("creatorPlus")} />
    </div>
  );
}
