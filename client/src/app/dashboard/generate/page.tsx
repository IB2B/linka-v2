import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { GenerateForm } from "@/components/generate/generate-form";
import { fetchNewsAction } from "./actions";

export default async function GeneratePage() {
  const news = await fetchNewsAction();
  return (
    <>
      <PageHeader
        title="Generate post"
        description="Pick a type, pick a topic, ship a post — your voice, on autopilot."
      />
      <Separator className="my-2" />
      <GenerateForm initialNews={news.data ?? []} />
    </>
  );
}
