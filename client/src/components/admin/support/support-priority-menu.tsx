"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SupportPriorityBadge } from "@/components/admin/support/support-priority-badge";
import { updateTicketAction } from "@/app/admin/support/actions";
import type { SupportPriority } from "@/types/admin-support";

const OPTIONS: SupportPriority[] = ["urgent", "high", "normal", "low"];
const LABEL: Record<SupportPriority, string> = {
  urgent: "Urgent", high: "High", normal: "Normal", low: "Low",
};

type Props = { id: string; priority: SupportPriority };

export function SupportPriorityMenu({ id, priority }: Props) {
  const [pending, start] = useTransition();
  function run(p: SupportPriority) {
    start(async () => {
      const res = await updateTicketAction(id, { priority: p });
      if ("error" in res) toast.error(res.error);
      else toast.success(`Priority set to ${LABEL[p]}`);
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={pending}
        className="inline-flex items-center gap-1 disabled:opacity-50"
      >
        <SupportPriorityBadge priority={priority} />
        <ChevronDown className="size-3 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {OPTIONS.map((p) => (
            <DropdownMenuItem key={p} onClick={() => run(p)}>
              {LABEL[p]}
              {p === priority ? (
                <span className="ml-auto text-xs text-muted-foreground">·</span>
              ) : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
