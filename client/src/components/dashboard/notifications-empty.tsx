import { Bell } from "lucide-react";

export function NotificationsEmpty() {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
      <Bell className="size-4 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">No notifications</p>
    </div>
  );
}
