// Unread count on the header bell. Rose reads as "needs attention" and stays
// clear of emerald (connected) and amber (new) used elsewhere.
export function NotificationBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span
      aria-hidden
      className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-none tabular-nums text-white ring-2 ring-background"
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}
