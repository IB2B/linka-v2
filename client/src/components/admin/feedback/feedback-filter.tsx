"use client";

import Link from "next/link";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FEEDBACK_FILTERS } from "@/lib/admin/feedback-filters";

function hrefFor(value: string, q?: string): string {
  const f = FEEDBACK_FILTERS.find((x) => x.value === value);
  const qs = new URLSearchParams();
  if (f?.status) qs.set("status", f.status);
  if (f?.category) qs.set("category", f.category);
  if (q) qs.set("q", q);
  return qs.size ? `/admin/feedback?${qs}` : "/admin/feedback";
}

type Props = { active: string; q?: string };

export function FeedbackFilter({ active, q }: Props) {
  const current = FEEDBACK_FILTERS.find((f) => f.value === active) ?? FEEDBACK_FILTERS[0];
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
          {FEEDBACK_FILTERS.map((f) => (
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
