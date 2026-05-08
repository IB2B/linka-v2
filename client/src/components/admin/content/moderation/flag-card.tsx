import { Card } from "@/components/ui/card";
import { ContentThumb } from "@/components/admin/content/content-thumb";
import { ContentPlatforms } from "@/components/admin/content/content-platforms";
import { ContentStatusBadge } from "@/components/admin/content/content-status-badge";
import { FlagStatusBadge } from "@/components/admin/content/moderation/flag-status-badge";
import { ReasonBadge } from "@/components/admin/content/moderation/reason-badge";
import { FlagPerson } from "@/components/admin/content/moderation/flag-person";
import { FlagResolution } from "@/components/admin/content/moderation/flag-resolution";
import { ModerationActions } from "@/components/admin/content/moderation/moderation-actions";
import { formatRelative } from "@/lib/admin/format-relative";
import type { FlagRow } from "@/types/admin-moderation";

export function FlagCard({ flag }: { flag: FlagRow }) {
  const resolved = flag.status === "actioned" || flag.status === "dismissed";
  return (
    <Card size="sm" className="gap-4 px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <ReasonBadge reason={flag.reason} />
          <FlagStatusBadge status={flag.status} />
          {flag.post.hiddenAt ? <ContentStatusBadge status="draft" /> : null}
        </div>
        <span
          className="text-xs tabular-nums tracking-tight text-muted-foreground"
          title={new Date(flag.createdAt).toLocaleString()}
        >
          Reported {formatRelative(flag.createdAt)}
        </span>
      </div>

      <div className="flex items-start gap-3 rounded-lg border bg-background/60 p-3">
        <ContentThumb src={flag.post.imageUrl} alt={flag.post.excerpt.slice(0, 40)} />
        <div className="min-w-0 flex-1 space-y-2">
          <p className="line-clamp-3 text-sm tracking-tight text-foreground/90">
            {flag.post.excerpt || <span className="italic text-muted-foreground">No content</span>}
          </p>
          <ContentPlatforms primary={flag.post.platform} platforms={[]} />
        </div>
      </div>

      {flag.details ? (
        <blockquote className="border-l-2 pl-3 text-sm tracking-tight text-muted-foreground">
          “{flag.details}”
        </blockquote>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <FlagPerson label="Reporter" person={flag.reporter} />
        <FlagPerson label="Author" person={flag.author} />
      </div>

      <FlagResolution resolution={flag.resolution} reviewedAt={flag.reviewedAt} />
      <ModerationActions flagId={flag.id} resolved={resolved} />
    </Card>
  );
}
