"use client";

import Link from "next/link";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USERS_FILTERS } from "@/lib/admin/users-filters";

function hrefFor(value: string, q?: string): string {
  const f = USERS_FILTERS.find((x) => x.value === value);
  const qs = new URLSearchParams();
  if (f?.role) qs.set("role", f.role);
  if (f?.status) qs.set("status", f.status);
  if (q) qs.set("q", q);
  return qs.size ? `/admin/users?${qs}` : "/admin/users";
}

type Props = { active: string; q?: string };

export function UsersFilter({ active, q }: Props) {
  const current = USERS_FILTERS.find((f) => f.value === active) ?? USERS_FILTERS[0];
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
          {USERS_FILTERS.map((f) => (
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
