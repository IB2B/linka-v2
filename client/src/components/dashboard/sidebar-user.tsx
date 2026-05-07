"use client";

import { useState } from "react";
import { ChevronsUpDown, LogOut } from "lucide-react";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { FeedbackDialog } from "@/components/feedback/feedback-dialog";
import { SidebarUserPreview } from "@/components/dashboard/sidebar-user-preview";
import { SidebarUserMenuHelp } from "./sidebar-user-menu-help";
import { useLogout } from "@/hooks/use-logout";
import type { SidebarUserProps } from "@/types/sidebar-user-props";

export function SidebarUser({ user }: SidebarUserProps) {
  const { isMobile } = useSidebar();
  const { logout, pending } = useLogout();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent" />
            }
          >
            <SidebarUserPreview user={user} />
            <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5">
                  <SidebarUserPreview user={user} />
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SidebarUserMenuHelp onSendFeedback={() => setFeedbackOpen(true)} />
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={pending} closeOnClick={false} onClick={() => logout()}>
              {pending ? <Spinner aria-hidden /> : <LogOut />}
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </SidebarMenu>
  );
}
