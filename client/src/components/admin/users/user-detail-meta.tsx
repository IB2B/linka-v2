import { Badge } from "@/components/ui/badge";
import type { AdminUserDetail } from "@/types/admin";

export function UserDetailMeta({ detail }: { detail: AdminUserDetail }) {
  const { profile, platforms } = detail;
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Job title", value: profile.jobTitle || "—" },
    { label: "Niche", value: profile.industry || "—" },
    { label: "Goal", value: profile.contentGoal || "—" },
    { label: "Tone", value: profile.brandTone || "—" },
    { label: "Audience", value: profile.targetAudience || "—" },
    { label: "Bio", value: profile.bio || "—" },
    {
      label: "Platforms",
      value: platforms.length ? (
        <div className="flex flex-wrap gap-1">
          {platforms.map((p) => (
            <Badge key={p} variant="outline" className="capitalize">{p}</Badge>
          ))}
        </div>
      ) : "—",
    },
  ];
  return (
    <dl className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-2.5 text-sm">
      {rows.map((r) => (
        <div key={r.label} className="contents">
          <dt className="tracking-tight text-muted-foreground">{r.label}</dt>
          <dd className="font-medium tracking-tight text-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
