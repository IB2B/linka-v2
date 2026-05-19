import Link from "next/link";
import { LogOut, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { SidebarUserPreview } from "@/components/dashboard/sidebar-user-preview";
import { SidebarUserMenuLegal } from "./sidebar-user-menu-legal";
import { SidebarUserMenuTheme } from "./sidebar-user-menu-theme";
import { SidebarUserMenuLanguage } from "./sidebar-user-menu-language";
import type { SidebarUserProps } from "@/types/sidebar-user-props";

type Props = SidebarUserProps & {
  isMobile: boolean;
  pending: boolean;
  logout: () => void;
  onSendFeedback: () => void;
};

export function SidebarUserMenu({ user, isMobile, pending, logout, onSendFeedback }: Props) {
  const settingsHref = user.role === "USER" ? "/dashboard/settings" : "/admin/settings";
  const t = useTranslations("userMenu");
  return (
    <DropdownMenuContent className="min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
      <DropdownMenuGroup>
        <DropdownMenuItem className="p-0 font-normal" render={<Link href={settingsHref} />}>
          <div className="flex items-center gap-2 px-1 py-1.5"><SidebarUserPreview user={user} /></div>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      {user.role === "USER" ? (
        <>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onSendFeedback}>
              <MessageSquare />
              {t("sendFeedback")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </>
      ) : null}
      <SidebarUserMenuLegal />
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <SidebarUserMenuLanguage label={t("language")} />
        <SidebarUserMenuTheme />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem disabled={pending} closeOnClick={false} onClick={() => logout()}>
        {pending ? <Spinner aria-hidden /> : <LogOut />}
        {t("logout")}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
