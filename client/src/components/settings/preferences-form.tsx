"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import { Spinner } from "@/components/ui/spinner";
import { setLocaleAction } from "@/lib/i18n/set-locale-action";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/config";

const SELECT_CLS =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

export function PreferencesForm() {
  const t = useTranslations("settings.preferences");
  const locale = useLocale();
  const [pending, start] = useTransition();

  function onLocaleChange(next: string) {
    if (next === locale) return;
    start(async () => {
      const r = await setLocaleAction(next);
      if (r.error) toast.error(r.error);
      else toast.success(t("languageUpdated"));
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium" htmlFor="ui-language">
            {t("language")}
            {pending ? <Spinner size="xs" /> : null}
          </label>
          <select
            id="ui-language" className={SELECT_CLS}
            value={locale} disabled={pending}
            onChange={(e) => onLocaleChange(e.target.value)}
          >
            {LOCALES.map((l) => (
              <option key={l} value={l}>{LOCALE_LABELS[l as Locale]}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
