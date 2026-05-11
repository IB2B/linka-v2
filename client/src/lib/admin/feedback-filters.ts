export type FeedbackFilter = {
  value: string;
  label: string;
  status?: string;
  category?: string;
};

export const FEEDBACK_FILTERS: FeedbackFilter[] = [
  { value: "all",      label: "All" },
  { value: "new",      label: "New",      status: "new" },
  { value: "triaged",  label: "Read",     status: "triaged" },
  { value: "closed",   label: "Closed",   status: "closed" },
  { value: "bug",      label: "Bugs",     category: "bug" },
  { value: "feature",  label: "Features", category: "feature" },
  { value: "general",  label: "General",  category: "general" },
];

export function feedbackFilterFromParams(
  p: { status?: string; category?: string },
): string {
  if (p.status) {
    const f = FEEDBACK_FILTERS.find((x) => x.status === p.status);
    if (f) return f.value;
  }
  if (p.category) {
    const f = FEEDBACK_FILTERS.find((x) => x.category === p.category);
    if (f) return f.value;
  }
  return "all";
}
