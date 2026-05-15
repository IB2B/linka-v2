"use client";

import { useEffect, useState } from "react";

const POLL_INTERVAL = 30_000;

type UnreadData = { count: number; ids: Set<string> };

async function fetchUnreadData(): Promise<UnreadData> {
  try {
    const res = await fetch("/api/inbox/conversations", { cache: "no-store" });
    if (!res.ok) return { count: 0, ids: new Set() };
    const data = await res.json() as { conversations: { id: string; unread: boolean }[] };
    const unread = (data.conversations ?? []).filter((c) => c.unread);
    return { count: unread.length, ids: new Set(unread.map((c) => c.id)) };
  } catch {
    return { count: 0, ids: new Set() };
  }
}

export function useInboxUnread() {
  const [data, setData] = useState<UnreadData>({ count: 0, ids: new Set() });

  useEffect(() => {
    let mounted = true;
    const refresh = () => fetchUnreadData().then((d) => { if (mounted) setData(d); });
    refresh();
    const id = setInterval(refresh, POLL_INTERVAL);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return data;
}

export function useInboxUnreadCount() {
  return useInboxUnread().count;
}
