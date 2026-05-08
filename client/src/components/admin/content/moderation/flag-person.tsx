import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import type { FlagPerson as FP } from "@/types/admin-moderation";

type Props = { label: string; person: FP };

export function FlagPerson({ label, person }: Props) {
  const fullName = `${person.firstName} ${person.lastName}`.trim() || person.email;
  return (
    <div className="space-y-1">
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="flex items-center gap-2">
        <InboxAvatar name={fullName} src={person.avatarUrl} />
        <div className="min-w-0">
          <div className="truncate text-sm font-medium tracking-tight">{fullName}</div>
          <div className="truncate text-xs tracking-tight text-muted-foreground">{person.email}</div>
        </div>
      </div>
    </div>
  );
}
