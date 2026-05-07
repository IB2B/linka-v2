import { HeaderClock } from "./header-clock";
import { NotificationsBell } from "./notifications-bell";

type Props = { prefix: string };

export function HeaderActions({ prefix }: Props) {
  return (
    <div className="ml-auto flex items-center gap-2">
      <HeaderClock />
      <NotificationsBell prefix={prefix} />
    </div>
  );
}
