import type { ReactNode } from "react";

/** A white row inside a surface — the dashboard's list-item look. */
export function MockRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1.5 ring-1 ring-[#EFEFEF]">
      {children}
    </div>
  );
}
