"use client";

import Link from "next/link";

import { useSidebar } from "@/components/ui/sidebar";
import { summarise } from "@/components/admin/overview/overview-services-status";
import { useServiceHealth } from "./use-service-health";
import type { UserRole } from "@/types/user-role";

export function SidebarServiceHealth({ role }: { role: UserRole }) {
  const { state, isMobile } = useSidebar();
  const isAdmin = role !== "USER";
  const items = useServiceHealth(isAdmin);

  if (!isAdmin || (state === "collapsed" && !isMobile)) return null;
  if (!items || items.length === 0) return null;

  const s = summarise(items);
  return (
    <Link
      href="/admin/settings?section=integrations"
      title={s.label}
      className="mx-2 mb-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium tracking-tight text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
    >
      <span className="relative flex size-2 shrink-0">
        {s.dot === "bg-emerald-500" && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        )}
        <span className={`relative inline-flex size-2 rounded-full ${s.dot}`} />
      </span>
      <span className="truncate">{s.label}</span>
    </Link>
  );
}
