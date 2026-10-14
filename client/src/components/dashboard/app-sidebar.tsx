import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarBrand } from "@/components/dashboard/sidebar-brand";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { SidebarUpgrade } from "@/components/dashboard/sidebar-upgrade";
import { SidebarServiceHealth } from "@/components/dashboard/sidebar-service-health";
import { SidebarUser } from "@/components/dashboard/sidebar-user";
import type { AppSidebarProps } from "@/types/app-sidebar-props";

export function AppSidebar({ user, usage, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav role={user.role} tier={user.tier} features={user.features} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUpgrade user={user} usage={usage} />
        <SidebarServiceHealth role={user.role} />
        <SidebarUser user={user} usage={usage} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
