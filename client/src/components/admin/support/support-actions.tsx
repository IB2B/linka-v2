"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  ArchiveX, CheckCircle2, Clock, MoreHorizontal, RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateTicketAction } from "@/app/admin/support/actions";
import type { SupportStatus } from "@/types/admin-support";

const LABEL: Record<SupportStatus, string> = {
  open: "Reopened ticket",
  pending: "Marked as pending",
  resolved: "Marked as resolved",
  closed: "Closed ticket",
};

type Props = { id: string; status: SupportStatus };

export function SupportActions({ id, status }: Props) {
  const [pending, start] = useTransition();
  function run(next: SupportStatus) {
    start(async () => {
      const res = await updateTicketAction(id, { status: next });
      if ("error" in res) toast.error(res.error);
      else toast.success(LABEL[next]);
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" disabled={pending} />}
      >
        <MoreHorizontal className="size-4" />
        <span className="sr-only">Ticket actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          {status !== "pending" && status !== "resolved" && status !== "closed" ? (
            <DropdownMenuItem onClick={() => run("pending")}>
              <Clock className="size-3.5" /> Mark pending
            </DropdownMenuItem>
          ) : null}
          {status !== "resolved" && status !== "closed" ? (
            <DropdownMenuItem onClick={() => run("resolved")}>
              <CheckCircle2 className="size-3.5" /> Resolve
            </DropdownMenuItem>
          ) : null}
          {status !== "closed" ? (
            <DropdownMenuItem onClick={() => run("closed")}>
              <ArchiveX className="size-3.5" /> Close
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => run("open")}>
              <RotateCcw className="size-3.5" /> Reopen
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
