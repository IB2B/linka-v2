import { PlatformIcon } from "@/components/accounts/platform-icon";

type Props = { primary: string | null; platforms: string[] };

export function ContentPlatforms({ primary, platforms }: Props) {
  const all = Array.from(new Set([
    ...(primary ? [primary] : []),
    ...platforms,
  ])).filter(Boolean);
  if (all.length === 0) return <span className="text-xs text-muted-foreground">—</span>;
  const visible = all.slice(0, 3);
  const extra = all.length - visible.length;
  return (
    <div className="flex items-center gap-1">
      {visible.map((p) => (
        <span
          key={p}
          title={p}
          className="grid size-6 place-items-center rounded-full border bg-background"
        >
          <PlatformIcon platform={p} className="size-3.5" />
        </span>
      ))}
      {extra > 0 ? (
        <span className="ml-1 text-[11px] tabular-nums text-muted-foreground">
          +{extra}
        </span>
      ) : null}
    </div>
  );
}
