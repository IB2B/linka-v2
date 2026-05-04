import { toast } from "sonner";

const LABELS: Record<string, string> = {
  linkedin: "LinkedIn", x: "X", twitter: "X", threads: "Threads",
  instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok",
  youtube: "YouTube", reddit: "Reddit", bluesky: "Bluesky",
};

const label = (p: string) => LABELS[p] ?? p;

function joinNames(names: string[]): string {
  if (names.length === 1) return names[0];
  const last = names[names.length - 1];
  return `${names.slice(0, -1).join(", ")} & ${last}`;
}

export type PublishToastInput = {
  publishedTo: string[];
  failed: { platform: string; error: string | null }[];
};

export function showPublishToast({ publishedTo, failed }: PublishToastInput) {
  if (publishedTo.length > 0) {
    toast.success(`Posted to ${joinNames(publishedTo.map(label))}.`);
  }
  for (const f of failed) {
    toast.error(`${label(f.platform)} failed: ${f.error ?? "unknown error"}`);
  }
  if (publishedTo.length === 0 && failed.length === 0) toast.success("Post published.");
}
