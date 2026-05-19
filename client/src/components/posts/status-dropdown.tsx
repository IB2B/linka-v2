"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { StatusFilter } from "@/lib/posts/filter-posts";

const STATUS_VALUES: StatusFilter[] = ["all", "draft", "scheduled", "posted", "failed"];

type Props = { value: StatusFilter; onChange: (s: StatusFilter) => void };

export function StatusDropdown({ value, onChange }: Props) {
  const t = useTranslations("posts.status");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        {t(value)}
        <ChevronDown className="ml-1 size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {STATUS_VALUES.map((v) => (
          <DropdownMenuItem
            key={v}
            onClick={() => onChange(v)}
            className={cn(value === v && "font-medium text-foreground")}
          >
            {t(v)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
