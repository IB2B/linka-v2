"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Platform } from "@/lib/zernio/zernio-account.types";

type Ctx = {
  connected: Platform[];
  selected: Platform[];
  toggle: (p: Platform) => void;
  loading: boolean;
};

const PostPlatformsContext = createContext<Ctx | null>(null);

export function PostPlatformsProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState<Platform[]>([]);
  const [selected, setSelected] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/social/accounts", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { accounts: [] }))
      .then((d: { accounts: { platform: Platform }[] }) => {
        const list = (d.accounts ?? []).map((a) => a.platform);
        setConnected(list);
        setSelected(list);
      })
      .finally(() => setLoading(false));
  }, []);

  function toggle(p: Platform) {
    setSelected((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));
  }

  return (
    <PostPlatformsContext.Provider value={{ connected, selected, toggle, loading }}>
      {children}
    </PostPlatformsContext.Provider>
  );
}

export function usePostPlatforms(): Ctx | null {
  return useContext(PostPlatformsContext);
}
