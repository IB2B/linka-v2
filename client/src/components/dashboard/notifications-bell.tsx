"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Bell } from "lucide-react";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NotificationsGroups } from "./notifications-groups";
import { NotificationsEmpty } from "./notifications-empty";
import { buildNotifications, type Notification, type NotificationApiItem } from "./notifications-data";

const POLL_MS = 60_000;

export function NotificationsBell({ prefix }: { prefix: string }) {
  const [list, setList] = useState<Notification[]>([]);

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

  const total = list.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="relative"
            aria-label={total > 0 ? `Notifications (${total} new)` : "Notifications"}
          >
            <Bell />
            {total > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[9px] font-semibold leading-none text-white">
                {total > 9 ? "9+" : total}
              </span>
            )}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-[20rem] p-0">
        <div className="border-b px-3 py-2.5">
          <span className="text-sm font-semibold">Notifications</span>
        </div>
        {list.length === 0 ? <NotificationsEmpty /> : <NotificationsGroups list={list} />}
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
