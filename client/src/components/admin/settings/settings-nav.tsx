import Link from "next/link";

import { cn } from "@/lib/utils";

export type SettingsNavItem = { id: string; label: string };

type Props = { items: SettingsNavItem[]; active: string };

export function SettingsNav({ items, active }: Props) {
  return (
    <nav className="-mx-1 flex flex-row gap-1 overflow-x-auto px-1 md:sticky md:top-20 md:mx-0 md:flex-col md:gap-0.5 md:overflow-visible md:px-0">
      {items.map((i) => {
        const isActive = active === i.id;
        return (
          <Link
            key={i.id}
            href={i.id === "profile" ? "/admin/settings" : `/admin/settings?section=${i.id}`}
            scroll={false}
            className={cn(
              "shrink-0 rounded-md px-3 py-1.5 text-sm tracking-tight transition",
              isActive
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
