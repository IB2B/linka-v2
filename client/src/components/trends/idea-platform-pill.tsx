const TONES: Record<string, string> = {
  linkedin: "bg-sky-500/10 text-sky-600",
  twitter: "bg-zinc-500/10 text-zinc-600",
  threads: "bg-zinc-700/10 text-zinc-600",
  instagram: "bg-fuchsia-500/10 text-fuchsia-600",
  facebook: "bg-blue-500/10 text-blue-600",
};

const LABELS: Record<string, string> = {
  linkedin: "LinkedIn", twitter: "X", threads: "Threads",
  instagram: "Instagram", facebook: "Facebook",
};

// Colored pill for a trend idea's target platform (normalized values).
export function IdeaPlatformPill({ platform }: { platform: string }) {
  const tone = TONES[platform] ?? "bg-muted text-muted-foreground";
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tone}`}>
      {LABELS[platform] ?? platform}
    </span>
  );
}
