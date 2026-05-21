export function NotificationsEmpty() {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
      <p className="text-sm font-medium text-foreground">You&rsquo;re all caught up</p>
      <p className="text-xs text-muted-foreground">No new notifications right now.</p>
    </div>
  );
}
