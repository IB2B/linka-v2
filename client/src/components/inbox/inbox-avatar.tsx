import { cn } from "@/lib/utils";

type Props = { name: string; src: string | null; size?: "sm" | "md" };

export function InboxAvatar({ name, src, size = "md" }: Props) {
  const sizeClass = size === "sm" ? "size-7 text-xs" : "size-9 text-sm";
  const initial = name.trim().slice(0, 1).toUpperCase() || "?";

  return (
    <div className={cn(
      "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground",
      sizeClass,
    )}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}
