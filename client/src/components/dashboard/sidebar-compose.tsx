"use client";

import Link from "next/link";
import { Plus, Sparkles, PenSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ComposePost } from "@/components/posts/compose-post";

const TRIGGER_CLASS =
  "justify-center bg-primary font-medium text-primary-foreground hover:bg-primary/90 " +
  "hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground " +
  "data-[state=open]:bg-primary/90 data-[state=open]:text-primary-foreground";

export function SidebarCompose() {
  const t = useTranslations("posts.compose");
  const { isMobile } = useSidebar();
  const label = t("newPost");

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <ComposePost>
              {(open) => (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<SidebarMenuButton tooltip={label} className={TRIGGER_CLASS} />}
                  >
                    <Plus className="text-foreground dark:text-primary-foreground" />
                    <span className="group-data-[collapsible=icon]:hidden">{label}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"} align="start" sideOffset={8}>
                    <DropdownMenuGroup>
                      <DropdownMenuItem render={<Link href="/dashboard/generate" />}>
                        <Sparkles />
                        {t("generateOption")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={open}>
                        <PenSquare />
                        {t("manualOption")}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </ComposePost>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
