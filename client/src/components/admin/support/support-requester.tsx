import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import type { SupportUser } from "@/types/admin-support";

export function SupportRequester({ user }: { user: SupportUser }) {
  const fullName =
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email;
  return (
    <div className="flex items-center gap-2">
      <InboxAvatar name={fullName} src={user.avatarUrl} />
      <div className="min-w-0">
        <div className="truncate text-sm font-medium tracking-tight">{fullName}</div>
        <div className="truncate text-xs tracking-tight text-muted-foreground">
          {user.email}
        </div>
      </div>
    </div>
  );
}
