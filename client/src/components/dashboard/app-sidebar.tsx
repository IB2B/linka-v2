import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarBrand } from "@/components/dashboard/sidebar-brand";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { SidebarUser } from "@/components/dashboard/sidebar-user";
import type { AppSidebarProps } from "@/types/app-sidebar-props";

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav role={user.role} features={user.features} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
