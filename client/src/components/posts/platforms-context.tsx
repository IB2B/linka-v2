"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Platform } from "@/lib/zernio/zernio-account.types";
import { initialSelection } from "./match-platform";

type Ctx = {
  connected: Platform[];
  selected: Platform[];
  toggle: (p: Platform) => void;
  loading: boolean;
};

const PostPlatformsContext = createContext<Ctx | null>(null);

type Props = { children: ReactNode; postPlatform: string | null };

export function PostPlatformsProvider({ children, postPlatform }: Props) {
  const [connected, setConnected] = useState<Platform[]>([]);
  const [selected, setSelected] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/social/accounts", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { accounts: [] }))
      .then((d: { accounts: { platform: Platform }[] }) => {
        const list = (d.accounts ?? []).map((a) => a.platform);
        setConnected(list);
        // Used to arm whichever account the API listed first, so a LinkedIn post
        // opened with Facebook selected and one click sent LinkedIn copy there.
        setSelected(initialSelection(postPlatform, list));
      })
      .finally(() => setLoading(false));
  }, [postPlatform]);

  function toggle(p: Platform) {
    setSelected((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
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
