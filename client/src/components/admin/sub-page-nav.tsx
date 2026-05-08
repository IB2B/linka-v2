import Link from "next/link";

import { cn } from "@/lib/utils";

export type SubNavItem = { id: string; label: string };

type Props = { items: SubNavItem[]; active: string; basePath: string; defaultId: string };

export function SubPageNav({ items, active, basePath, defaultId }: Props) {
  return (
    <div className="-mt-2 border-b">
      <nav className="-mb-px flex gap-6 overflow-x-auto">
        {items.map((i) => {
          const isActive = active === i.id;
          const href = i.id === defaultId ? basePath : `${basePath}?tab=${i.id}`;
          return (
            <Link
              key={i.id}
              href={href}
              scroll={false}
              className={cn(
                "shrink-0 border-b-2 px-1 py-3 text-sm tracking-tight transition",
                isActive
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {i.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
