"use client";

import Link from "next/link";
import { FileText, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenuGroup, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function SidebarUserMenuLegal() {
  const t = useTranslations("userMenu");
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem render={<Link href="/terms" />}>
        <FileText />
        {t("termsOfService")}
      </DropdownMenuItem>
      <DropdownMenuItem render={<Link href="/privacy" />}>
        <ShieldCheck />
        {t("privacyPolicy")}
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
