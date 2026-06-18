"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getNavigationForRole } from "@/lib/dashboard/navigation";
import type { SidebarNavProps } from "@/types/sidebar-nav-props";

const EXACT_MATCH = ["/dashboard", "/admin"];

function isActive(pathname: string, href: string) {
  if (EXACT_MATCH.includes(href)) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({ role, tier, features }: SidebarNavProps) {
  const pathname = usePathname();
  const groups = getNavigationForRole(role, tier, features);
  const t = useTranslations("nav");

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{t(group.label)}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href);
                const label = t(item.label);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={label}
                      render={
                        <Link href={item.href}>
                          <Icon />
                          <span className="group-data-[collapsible=icon]:hidden">{label}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
