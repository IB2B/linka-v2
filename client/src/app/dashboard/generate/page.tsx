import { getLocale, getTranslations } from "next-intl/server";

import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { GenerateForm } from "@/components/generate/generate-form";
import { fetchMe } from "@/lib/auth/me";
import { fetchNewsAction } from "./actions";

export default async function GeneratePage() {
  const [news, me, locale, t] = await Promise.all([
    fetchNewsAction(), fetchMe(), getLocale(), getTranslations("generate"),
  ]);
  // Remembered choice first, else fall back to the language they browse in.
  const defaultLanguage = me?.preferredLanguage ?? locale ?? "en";
  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <Separator className="my-2" />
      <GenerateForm initialNews={news.data ?? []} defaultLanguage={defaultLanguage} />
    </>
  );
}
