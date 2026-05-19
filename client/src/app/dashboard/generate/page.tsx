import { getTranslations } from "next-intl/server";

import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { GenerateForm } from "@/components/generate/generate-form";
import { fetchNewsAction } from "./actions";

export default async function GeneratePage() {
  const [news, t] = await Promise.all([fetchNewsAction(), getTranslations("generate")]);
  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <Separator className="my-2" />
      <GenerateForm initialNews={news.data ?? []} />
    </>
  );
}
