import { KanbanSquare } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function PipelineEmptyState() {
  const t = await getTranslations("pipeline.empty");
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/40 px-6 py-16 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <KanbanSquare className="size-5" />
      </div>
      <h3 className="text-base font-semibold">{t("title")}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{t("message")}</p>
    </div>
  );
}
