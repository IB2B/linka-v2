import { HeaderClock } from "./header-clock";
import { NotificationsBell } from "./notifications-bell";
import { SearchTrigger } from "./search-trigger";
import type { NavGroup } from "@/types/nav-item";

type Props = { prefix: string; groups: NavGroup[] };

export function HeaderActions({ prefix, groups }: Props) {
  return (
    <div className="ml-auto flex items-center gap-2 md:gap-3">
      <SearchTrigger groups={groups} />
      <HeaderClock />
      <div className="hidden h-4 w-px bg-border md:block" aria-hidden />
      <NotificationsBell prefix={prefix} />
    </div>
  );
}
