import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { metaFor, TONE_CLASSES } from "@/lib/admin/activity-meta";
import type { ActivityActor, ActivityType } from "@/types/admin";

type Props = { actor: ActivityActor | null; type: ActivityType };

export function ActivityAvatar({ actor, type }: Props) {
  const { Icon, tone } = metaFor(type);
  const name = actor
    ? `${actor.firstName} ${actor.lastName}`.trim() || actor.email
    : "?";
  return (
    <span className="relative inline-flex">
      <InboxAvatar name={name} src={actor?.avatarUrl ?? null} />
      <span className={`absolute -right-1 -bottom-1 grid size-5 place-items-center rounded-full ring-2 ring-card ${TONE_CLASSES[tone]}`}>
        <Icon className="size-3" />
      </span>
    </span>
  );
}
