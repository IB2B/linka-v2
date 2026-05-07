"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Bell } from "lucide-react";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NotificationsTabs } from "./notifications-tabs";
import { NotificationsGroups } from "./notifications-groups";
import { NotificationsEmpty } from "./notifications-empty";
import {
  buildNotifications, filterNotifications,
  type Notification, type NotificationApiItem, type NotificationFilter,
} from "./notifications-data";

const POLL_MS = 60_000;

export function NotificationsBell({ prefix }: { prefix: string }) {
  const [list, setList] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<NotificationFilter>("all");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const r = await fetch("/api/posts/notifications", { cache: "no-store" });
        if (!r.ok) return;
        const d = (await r.json()) as { items: NotificationApiItem[] };
        if (!cancelled) setList(buildNotifications(d.items ?? [], prefix));
      } catch { /* ignore */ }
    }
    load();
    const id = setInterval(load, POLL_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, [prefix]);

  const filtered = filterNotifications(list, filter);
  const total = list.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm">
            <Bell />
            Notifications
            {total > 0 ? <Badge variant="destructive">{total}</Badge> : null}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-[22rem] p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-sm font-semibold">Notifications</span>
          <span className="text-[11px] text-muted-foreground">
            {total === 0 ? "No new updates" : `${total} new`}
          </span>
        </div>
        <NotificationsTabs list={list} value={filter} onChange={setFilter} />
        {filtered.length === 0
          ? <NotificationsEmpty filter={filter} />
          : <NotificationsGroups list={filtered} />}
        <div className="border-t p-1.5">
          <Link
            href={`${prefix}/posts`}
            className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            View all posts
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
