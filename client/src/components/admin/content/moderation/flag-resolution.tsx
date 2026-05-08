import { formatRelative } from "@/lib/admin/format-relative";

const LABEL: Record<string, string> = {
  dismissed: "Flag dismissed",
  hidden: "Post hidden",
  user_warned: "User warned",
  user_suspended: "User suspended",
};

type Props = { resolution: string; reviewedAt: string | null };

export function FlagResolution({ resolution, reviewedAt }: Props) {
  if (!resolution || resolution === "none") return null;
  return (
    <div className="rounded-md border border-dashed bg-muted/30 px-3 py-2 text-xs tracking-tight text-muted-foreground">
      <span className="font-medium text-foreground">
        {LABEL[resolution] ?? resolution}
      </span>
      {reviewedAt ? <span> · {formatRelative(reviewedAt)}</span> : null}
    </div>
  );
}
