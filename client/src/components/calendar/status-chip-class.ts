import type { PostStatus } from "@/types/post";

const CLASSES: Record<PostStatus, string> = {
  scheduled: "bg-scheduled text-scheduled-foreground",
  posted: "bg-posted text-posted-foreground",
  draft: "bg-draft text-draft-foreground",
  failed: "bg-failed text-failed-foreground",
};

export function statusChipClass(status: PostStatus): string {
  return CLASSES[status];
}
