import Link from "next/link";
import { Plus } from "lucide-react";

export function ConnectPlatformLink({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <Link
      href="/dashboard/accounts"
      className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
    >
      <Plus className="size-3.5" />
      Connect more
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground/80">
        {count} available
      </span>
    </Link>
  );
}
