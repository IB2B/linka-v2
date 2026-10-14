"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { FeedbackDialog } from "@/components/feedback/feedback-dialog";
import { UpgradePlansDialog } from "@/components/billing/upgrade-plans-dialog";
import { SidebarUserPreview } from "@/components/dashboard/sidebar-user-preview";
import { SidebarUserMenu } from "./sidebar-user-menu";
import { useLogout } from "@/hooks/use-logout";
import type { SidebarUserProps } from "@/types/sidebar-user-props";

export function SidebarUser({ user, usage }: SidebarUserProps) {
  const { isMobile } = useSidebar();
  const { logout, pending } = useLogout();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent" />}
          >
            <SidebarUserPreview user={user} usage={usage} />
            <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
          </DropdownMenuTrigger>
          <SidebarUserMenu
            user={user} usage={usage} isMobile={isMobile} pending={pending}
            logout={logout} onSendFeedback={() => setFeedbackOpen(true)}
            onUpgrade={() => setUpgradeOpen(true)}
          />
        </DropdownMenu>
      </SidebarMenuItem>
      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
      <UpgradePlansDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} currentTier={user.tier} />
    </SidebarMenu>
  );
}
