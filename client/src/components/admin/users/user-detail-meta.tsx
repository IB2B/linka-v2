import { Badge } from "@/components/ui/badge";
import type { AdminUserDetail } from "@/types/admin";

export function UserDetailMeta({ detail }: { detail: AdminUserDetail }) {
  const { profile, platforms } = detail;
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Job title", value: profile.jobTitle || "—" },
    { label: "Industry", value: profile.industry || "—" },
    { label: "Company type", value: profile.companyType || "—" },
    { label: "Company size", value: profile.companySize ? `${profile.companySize} employees` : "—" },
    { label: "Funding", value: profile.fundingAmount || "—" },
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
    <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-sm">
      {rows.map((r) => (
        <div key={r.label} className="contents">
          <dt className="tracking-tight text-muted-foreground">{r.label}</dt>
          <dd className="tracking-tight">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
