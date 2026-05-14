"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function buildMonths() {
  const months: { value: string; label: string }[] = [
    { value: "", label: "All time" },
  ];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    months.push({ value, label });
  }
  return months;
}

const MONTHS = buildMonths();

export function UserMonthPicker({ current }: { current?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const active = MONTHS.find((m) => m.value === (current ?? "")) ?? MONTHS[0];

  const select = (value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set("month", value);
    else params.delete("month");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        {active.label}<ChevronDown className="ml-1.5 size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {MONTHS.map((m) => (
          <DropdownMenuItem
            key={m.value || "all"}
            onClick={() => select(m.value)}
            className={m.value === active.value ? "font-medium" : ""}
          >
            {m.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
