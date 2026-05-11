import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import type { FeedbackUser } from "@/types/admin-feedback";

export function FeedbackAuthor({ user }: { user: FeedbackUser | null }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <InboxAvatar name="?" src={null} />
        <span className="tracking-tight italic">Anonymous</span>
      </div>
    );
  }
  const fullName =
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    || user.email
    || "Unknown";
  return (
    <div className="flex items-center gap-2">
      <InboxAvatar name={fullName} src={user.avatarUrl} />
      <div className="min-w-0">
        <div className="truncate text-sm font-medium tracking-tight">{fullName}</div>
        <div className="truncate text-xs tracking-tight text-muted-foreground">
          {user.email ?? "—"}
        </div>
      </div>
    </div>
  );
}
