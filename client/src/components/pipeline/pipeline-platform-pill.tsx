import type { OpportunityPlatform } from "@/types/pipeline";

const LABELS: Record<OpportunityPlatform, string> = {
  linkedin: "LinkedIn",
  x: "X",
  instagram: "Instagram",
  threads: "Threads",
  facebook: "Facebook",
  tiktok: "TikTok",
};

const TONES: Record<OpportunityPlatform, string> = {
  linkedin: "bg-sky-500/10 text-sky-600",
  x: "bg-zinc-500/10 text-zinc-700",
  instagram: "bg-fuchsia-500/10 text-fuchsia-600",
  threads: "bg-zinc-700/10 text-zinc-700",
  facebook: "bg-blue-500/10 text-blue-600",
  tiktok: "bg-rose-500/10 text-rose-600",
};

export function PipelinePlatformPill({ platform }: { platform: OpportunityPlatform }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${TONES[platform]}`}>
      {LABELS[platform]}
    </span>
  );
}
