"use client";

import { useEffect, useState } from "react";
import { Moon, Monitor, Sun, Palette, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/theme/use-theme";

import {
  DropdownMenuItem, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

const OPTIONS = [
  { value: "light", labelKey: "themeLight", icon: Sun },
  { value: "dark", labelKey: "themeDark", icon: Moon },
  { value: "system", labelKey: "themeSystem", icon: Monitor },
] as const;

export function SidebarUserMenuTheme() {
  const t = useTranslations("userMenu");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = mounted ? theme ?? "light" : "light";

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Palette />
        {t("theme")}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="min-w-36">
        {OPTIONS.map(({ value, labelKey, icon: Icon }) => (
          <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
            <Icon />
            {t(labelKey)}
            {active === value ? <Check className="ml-auto size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
