import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarBrand } from "@/components/dashboard/sidebar-brand";
import { SidebarCompose } from "@/components/dashboard/sidebar-compose";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { SidebarUpgrade } from "@/components/dashboard/sidebar-upgrade";
import { SidebarServiceHealth } from "@/components/dashboard/sidebar-service-health";
import { SidebarUser } from "@/components/dashboard/sidebar-user";
import type { AppSidebarProps } from "@/types/app-sidebar-props";

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        {user.role === "USER" ? <SidebarCompose /> : null}
        <SidebarNav role={user.role} tier={user.tier} features={user.features} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUpgrade user={user} />
        <SidebarServiceHealth role={user.role} />
        <SidebarUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
