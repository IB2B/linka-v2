import type { ReactNode } from "react";

const TONES = {
  muted: "bg-white text-[#737373] ring-[#E9E9E9]",
  brand: "bg-[#6D5FF9]/8 text-[#6D5FF9] ring-[#6D5FF9]/15",
  good: "bg-[#00A06C]/8 text-[#00A06C] ring-[#00A06C]/15",
} as const;

/** Small pill used for platform names, counts and status labels. */
export function MockChip({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9.5px] font-medium leading-none tracking-tight ring-1 ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
