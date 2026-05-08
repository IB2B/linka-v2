import Link from "next/link";

import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

type Props = { items: Item[]; active: string; basePath: string };

function buildHref(basePath: string, isFirst: boolean, id: string): string {
  if (isFirst) return basePath;
  const sep = basePath.includes("?") ? "&" : "?";
  return `${basePath}${sep}view=${id}`;
}

export function PaymentsToggle({ items, active, basePath }: Props) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border bg-muted/40 p-1">
      {items.map((i, idx) => {
        const isActive = active === i.id;
        const href = buildHref(basePath, idx === 0, i.id);
        return (
          <Link
            key={i.id}
            href={href}
            scroll={false}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium tracking-tight transition",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {i.label}
          </Link>
        );
      })}
    </div>
  );
}
