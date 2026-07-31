"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Notification } from "./notifications-data";
import { loadAdminNotifications, loadUserNotifications } from "./notifications-loaders";
import { readAllUrls, readOneUrl } from "./notifications-read-urls";

const POLL_MS = 60_000;

export function useNotifications(prefix: string, isAdmin: boolean) {
  const [list, setList] = useState<Notification[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const next = isAdmin
        ? await loadAdminNotifications(prefix)
        : await loadUserNotifications(prefix);
      if (!cancelled) setList(next);
    }
    load();
    const id = setInterval(load, POLL_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, [prefix, isAdmin]);

  const markRead = useCallback((id: string) => {
    const url = readOneUrl(id, isAdmin);
    if (!url) return;
    setList((l) => l.map((n) => (n.id === id ? { ...n, seen: true } : n)));
    fetch(url, { method: "POST", keepalive: true }).catch(() => {});
  }, [isAdmin]);

  const markAllRead = useCallback(() => {
    setList((l) => l.map((n) => (readOneUrl(n.id, isAdmin) ? { ...n, seen: true } : n)));
    for (const url of readAllUrls(isAdmin)) {
      fetch(url, { method: "POST" }).catch(() => {});
    }
  }, [isAdmin]);

  const unreadCount = useMemo(() => list.filter((n) => n.seen !== true).length, [list]);
  const canMarkAll = useMemo(
    () => list.some((n) => n.seen !== true && readOneUrl(n.id, isAdmin) !== null),
    [list, isAdmin],
  );
  return { list, unreadCount, canMarkAll, markRead, markAllRead };
}
