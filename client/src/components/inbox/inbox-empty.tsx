import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

export function InboxEmpty({ message }: { message?: string }) {
  const t = useTranslations("inbox.empty");
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <MessageSquare aria-hidden className="size-5 text-muted-foreground" />
      </span>
      <p className="text-sm font-medium">{t("title")}</p>
      <p className="max-w-xs text-xs text-muted-foreground">
        {message ?? t("message")}
      </p>
    </div>
  );
}
