export type ContentFilter = {
  value: string;
  label: string;
  status?: string;
  platform?: string;
};

export const CONTENT_FILTERS: ContentFilter[] = [
  { value: "all",       label: "All" },
  { value: "posted",    label: "Posted",    status: "posted" },
  { value: "scheduled", label: "Scheduled", status: "scheduled" },
  { value: "draft",     label: "Drafts",    status: "draft" },
  { value: "failed",    label: "Failed",    status: "failed" },
  { value: "linkedin",  label: "LinkedIn",  platform: "linkedin" },
  { value: "twitter",   label: "Twitter",   platform: "twitter" },
  { value: "instagram", label: "Instagram", platform: "instagram" },
];

export function contentFilterFromParams(p: { status?: string; platform?: string }): string {
  if (p.status) {
    const f = CONTENT_FILTERS.find((x) => x.status === p.status);
    if (f) return f.value;
  }
  if (p.platform) {
    const f = CONTENT_FILTERS.find((x) => x.platform === p.platform);
    if (f) return f.value;
  }
  return "all";
}
