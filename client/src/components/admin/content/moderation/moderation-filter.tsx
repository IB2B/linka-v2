"use client";

import Link from "next/link";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOD_FILTERS } from "@/lib/admin/moderation-filters";

function hrefFor(value: string, q?: string): string {
  const f = MOD_FILTERS.find((x) => x.value === value);
  const qs = new URLSearchParams();
  qs.set("tab", "moderation");
  if (f?.status) qs.set("status", f.status);
  if (f?.reason) qs.set("reason", f.reason);
  if (q) qs.set("q", q);
  return `/admin/content?${qs}`;
}

type Props = { active: string; q?: string };

export function ModerationFilter({ active, q }: Props) {
  const current = MOD_FILTERS.find((f) => f.value === active) ?? MOD_FILTERS[0];
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
          {MOD_FILTERS.map((f) => (
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
