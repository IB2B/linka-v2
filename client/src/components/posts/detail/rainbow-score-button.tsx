import type { ReactNode } from "react";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};

export function RainbowScoreButton({ onClick, disabled, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group relative inline-flex h-8 items-center overflow-hidden rounded-md p-[1.5px] text-xs font-medium disabled:opacity-60"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(#ef4444,#f59e0b,#eab308,#22c55e,#06b6d4,#6366f1,#a855f7,#ef4444)] opacity-90 transition group-hover:opacity-100 motion-safe:animate-[spin_4s_linear_infinite]"
      />
      <span className="relative inline-flex items-center gap-1.5 rounded-[5px] bg-background px-3 py-1.5 text-foreground">
        {children}
      </span>
    </button>
  );
}
