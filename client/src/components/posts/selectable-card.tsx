"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { useSelection } from "./selection-context";

export function SelectableCard({ id, children }: { id: string; children: ReactNode }) {
  const sel = useSelection();
  if (!sel.enabled) return <>{children}</>;
  const checked = sel.selected.has(id);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => sel.toggle(id)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sel.toggle(id); } }}
      className={`relative block w-full cursor-pointer text-left rounded-xl transition-all ${
        checked ? "ring-2 ring-primary" : "ring-1 ring-transparent hover:ring-foreground/20"
      }`}
    >
      <div className="pointer-events-none absolute right-3 top-3 z-10">
        <span className={`flex size-6 items-center justify-center rounded-full border-2 transition ${
          checked ? "border-primary bg-primary text-primary-foreground" : "border-foreground/40 bg-background/80"
        }`}>
          {checked ? <Check className="size-3.5" /> : null}
        </span>
      </div>
      <div className="pointer-events-none">{children}</div>
    </div>
  );
}
