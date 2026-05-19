"use client";

import { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { Check, Languages } from "lucide-react";

import {
  DropdownMenuItem, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { setLocaleAction } from "@/lib/i18n/set-locale-action";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/config";

type Props = { label: string };

export function SidebarUserMenuLanguage({ label }: Props) {
  const locale = useLocale();
  const [pending, start] = useTransition();
  const [target, setTarget] = useState<Locale | null>(null);

  function onSelect(l: Locale) {
    if (l === locale || pending) return;
    setTarget(l);
    start(async () => { await setLocaleAction(l); });
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Languages />
        {label}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="min-w-36">
        {LOCALES.map((l) => {
          const isLoading = pending && target === l;
          const isActive = locale === l;
          return (
            <DropdownMenuItem
              key={l}
              disabled={pending}
              closeOnClick={false}
              onClick={() => onSelect(l)}
            >
              {LOCALE_LABELS[l]}
              {isLoading ? <Spinner size="sm" className="ml-auto" /> : null}
              {!isLoading && isActive ? <Check className="ml-auto size-4" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
