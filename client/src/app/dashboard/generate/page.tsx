import { getLocale, getTranslations } from "next-intl/server";

import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { GenerateForm } from "@/components/generate/generate-form";
import { GenerateDateBanner } from "@/components/generate/generate-date-banner";
import { fetchMe } from "@/lib/auth/me";
import { parseDay } from "@/lib/calendar/parse-day";
import { isPastDay } from "@/lib/calendar/view-range";
import { getUsage } from "@/lib/usage/get-usage";
import { fetchNewsAction } from "./actions";

type Props = { searchParams: Promise<{ date?: string | string[] }> };

export default async function GeneratePage({ searchParams }: Props) {
  const [news, me, usage, locale, t, sp] = await Promise.all([
    fetchNewsAction(), fetchMe(), getUsage(), getLocale(), getTranslations("generate"), searchParams,
  ]);
  // Remembered choice first, else fall back to the language they browse in.
  const defaultLanguage = me?.preferredLanguage ?? locale ?? "en";
  // Set when the flow starts from a calendar day; past days are ignored.
  const day = parseDay(typeof sp.date === "string" ? sp.date : null);
  const scheduleDate = day && !isPastDay(day) ? (sp.date as string) : null;
  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <Separator className="my-2" />
      {day && scheduleDate ? <GenerateDateBanner date={day} /> : null}
      <GenerateForm initialNews={news.data ?? []} defaultLanguage={defaultLanguage}
        scheduleDate={scheduleDate} usage={usage} />
    </>
  );
}
