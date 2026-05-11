"use client";

import Link from "next/link";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORT_FILTERS } from "@/lib/admin/support-filters";

function hrefFor(value: string, q?: string): string {
  const f = SUPPORT_FILTERS.find((x) => x.value === value);
  const qs = new URLSearchParams();
  if (f?.status) qs.set("status", f.status);
  if (f?.priority) qs.set("priority", f.priority);
  if (f?.category) qs.set("category", f.category);
  if (q) qs.set("q", q);
  return qs.size ? `/admin/support?${qs}` : "/admin/support";
}

type Props = { active: string; q?: string };

export function SupportFilter({ active, q }: Props) {
  const current = SUPPORT_FILTERS.find((f) => f.value === active) ?? SUPPORT_FILTERS[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        <Filter className="size-3.5" />
        Filter: {current.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Show</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {SUPPORT_FILTERS.map((f) => (
            <DropdownMenuItem
              key={f.value}
              render={<Link href={hrefFor(f.value, q)} scroll={false} />}
            >
              {f.label}
              {active === f.value && (
                <span className="ml-auto text-xs text-muted-foreground">·</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
