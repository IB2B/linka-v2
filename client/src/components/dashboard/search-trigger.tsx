"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SearchPalette } from "./search-palette";
import { getNavigationForRole } from "@/lib/dashboard/navigation";
import type { SidebarNavProps } from "@/types/sidebar-nav-props";

export function SearchTrigger({ role, tier, features }: SidebarNavProps) {
  const [open, setOpen] = useState(false);
  const groups = useMemo(
    () => getNavigationForRole(role, tier, features),
    [role, tier, features],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="group inline-flex h-8 w-9 items-center gap-2 rounded-md border bg-background px-2 text-xs text-muted-foreground transition hover:bg-muted/60 hover:text-foreground sm:w-48 sm:px-2.5 md:w-64"
      >
        <Search className="size-3.5 shrink-0" />
        <span className="hidden flex-1 text-left sm:inline">Search pages…</span>
        <kbd className="ml-auto hidden rounded border bg-muted/60 px-1.5 font-mono text-[10px] tracking-tight text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      </button>
      <SearchPalette open={open} onOpenChange={setOpen} groups={groups} />
    </>
  );
}
