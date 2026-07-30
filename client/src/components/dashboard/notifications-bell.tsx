"use client";

import Link from "next/link";
import { ArrowRight, Bell, CheckCheck } from "lucide-react";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NotificationBadge } from "./notification-badge";
import { NotificationsGroups } from "./notifications-groups";
import { NotificationsEmpty } from "./notifications-empty";
import { useNotifications } from "./use-notifications";
import type { UserRole } from "@/types/user-role";

type Props = { prefix: string; role: UserRole };

export function NotificationsBell({ prefix, role }: Props) {
  const isAdmin = role === "ADMIN";
  const { list, unreadCount, canMarkAll, markRead, markAllRead } = useNotifications(prefix, isAdmin);
  const tailHref = isAdmin ? `${prefix}/support` : `${prefix}/posts`;
  const tailLabel = isAdmin ? "View all tickets" : "View all posts";
  const headerCaption = unreadCount > 0 ? `${unreadCount} new` : "All caught up";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost" size="icon-sm" className="relative"
            aria-label={unreadCount > 0 ? `Notifications (${unreadCount} unread)` : "Notifications"}
          >
            <Bell />
            <NotificationBadge count={unreadCount} />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-[22rem] p-0">
        <div className="flex items-center justify-between gap-2 border-b px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">Notifications</p>
            <p className="text-[11px] text-muted-foreground leading-tight">{headerCaption}</p>
          </div>
          {canMarkAll && (
            <button
              type="button" onClick={markAllRead}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </button>
          )}
        </div>
        {list.length === 0 ? <NotificationsEmpty /> : (
          <NotificationsGroups
            list={list} onItemClick={markRead} onMarkRead={markRead}
          />
        )}
        <div className="border-t p-1.5">
          <Link
            href={tailHref}
            className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {tailLabel}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
