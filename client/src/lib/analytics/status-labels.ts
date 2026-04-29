import type { PostStatus } from "@/types/post";

export const STATUS_LABEL: Record<PostStatus, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  posted: "Posted",
  failed: "Failed",
};

export const STATUS_ORDER: PostStatus[] = [
  "draft",
  "scheduled",
  "posted",
  "failed",
];
