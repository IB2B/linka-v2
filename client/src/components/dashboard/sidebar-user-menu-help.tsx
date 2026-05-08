"use client";

import Link from "next/link";
import { LifeBuoy, MessageSquare, Sparkles } from "lucide-react";

import {
  DropdownMenuGroup, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Props = { onSendFeedback: () => void };

export function SidebarUserMenuHelp({ onSendFeedback }: Props) {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem render={<Link href="/dashboard/billing" />}>
        <Sparkles />
        Upgrade plan
      </DropdownMenuItem>
      <DropdownMenuItem render={<Link href="/dashboard/support" />}>
        <LifeBuoy />
        Support
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onSendFeedback}>
        <MessageSquare />
        Send feedback
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
