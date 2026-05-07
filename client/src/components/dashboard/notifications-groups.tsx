import { NotificationItem } from "./notification-item";
import { groupByDate, type Notification } from "./notifications-data";

export function NotificationsGroups({ list }: { list: Notification[] }) {
  const groups = groupByDate(list);
  return (
    <div className="max-h-[26rem] overflow-y-auto p-1">
      {groups.map((g) => (
        <div key={g.label} className="mb-1 last:mb-0">
          <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {g.label}
          </div>
          {g.items.map((n) => <NotificationItem key={n.id} n={n} />)}
        </div>
      ))}
    </div>
  );
}
