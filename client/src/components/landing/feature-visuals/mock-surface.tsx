import type { ReactNode } from "react";

/** The inset panel every feature visual sits in — matches the dashboard's
 *  card surface (rounded-xl, hairline ring, muted fill). */
export function MockSurface({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="h-[116px] overflow-hidden rounded-lg bg-[#FAFAFA] p-2.5 ring-1 ring-[#EFEFEF]"
    >
      {children}
    </div>
  );
}
