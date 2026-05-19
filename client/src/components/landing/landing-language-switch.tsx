"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { setLocaleAction } from "@/lib/i18n/set-locale-action";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/config";

export function LandingLanguageSwitch() {
  const locale = useLocale() as Locale;
  const [pending, start] = useTransition();

  function pick(next: Locale) {
    if (next === locale || pending) return;
    start(async () => { await setLocaleAction(next); });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] tracking-tight text-[#525252] transition hover:text-[#0F1113]"
        aria-label="Language"
      >
        {pending ? <Spinner size="xs" /> : <Languages className="size-3.5" />}
        {LOCALE_LABELS[locale]}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6}>
        {LOCALES.map((l) => (
          <DropdownMenuItem key={l} disabled={pending} closeOnClick={false} onClick={() => pick(l)}>
            {LOCALE_LABELS[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
