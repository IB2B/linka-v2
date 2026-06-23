"use client";

import { useEffect, useState } from "react";
import type { IntegrationStatus } from "@/types/admin-settings.types";

const POLL_MS = 120_000;

// Client-side liveness poll for the sidebar badge. Lazy (only when enabled)
// and infrequent, since each call triggers live external pings server-side.
export function useServiceHealth(enabled: boolean): IntegrationStatus[] | null {
  const [items, setItems] = useState<IntegrationStatus[] | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    async function load() {
      try {
        const r = await fetch("/api/admin/settings/integrations", { cache: "no-store" });
        if (!r.ok) return;
        const j = await r.json();
        if (!cancelled) setItems((j.integrations ?? []) as IntegrationStatus[]);
      } catch { /* keep last known value */ }
    }
    load();
    const id = setInterval(load, POLL_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, [enabled]);

  return items;
}
