"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useLocale } from "next-intl";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { setLocaleAction } from "@/lib/i18n/set-locale-action";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/config";

const NATIVE_SUBLABEL: Record<Locale, string> = {
  en: "English", fr: "French", es: "Spanish", de: "German", it: "Italian",
};

export function OnboardingLanguagePicker() {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const [pending, start] = useTransition();
  const [target, setTarget] = useState<Locale | null>(null);

  function pick(next: Locale) {
    setTarget(next);
    start(async () => {
      if (next !== locale) await setLocaleAction(next);
      router.push("/onboarding/company");
    });
  }

  return (
    <div className="grid gap-2">
      {LOCALES.map((l) => {
        const active = l === locale;
        const loading = pending && target === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => pick(l)}
            disabled={pending}
            className={cn(
              "flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 text-left text-sm transition-colors",
              "hover:border-foreground/30 hover:bg-muted/50 disabled:opacity-60",
              active ? "border-foreground/40" : "border-border",
            )}
          >
            <span className="flex flex-col">
              <span className="font-medium text-foreground">{LOCALE_LABELS[l]}</span>
              <span className="text-xs text-muted-foreground">{NATIVE_SUBLABEL[l]}</span>
            </span>
            {loading ? <Spinner size="sm" /> : active ? <Check className="size-4" /> : null}
          </button>
        );
      })}
    </div>
  );
}
