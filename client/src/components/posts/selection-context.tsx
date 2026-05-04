"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  selected: Set<string>;
  toggle: (id: string) => void;
  selectMany: (ids: string[]) => void;
  clear: () => void;
};

const SelectionContext = createContext<Ctx | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const value = useMemo<Ctx>(() => ({
    enabled,
    setEnabled: (v) => { setEnabledState(v); if (!v) setSelected(new Set()); },
    selected,
    toggle: (id) => setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    }),
    selectMany: (ids) => setSelected(new Set(ids)),
    clear: () => setSelected(new Set()),
  }), [enabled, selected]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection(): Ctx {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be inside SelectionProvider");
  return ctx;
}
