export type Metric = {
  value: string;
  label: string;
  hint: string;
};

export const METRICS: Metric[] = [
  {
    value: "184M",
    label: "Posts shipped",
    hint: "across 8 platforms in the last 12 months",
  },
  {
    value: "+312%",
    label: "Avg. reach lift",
    hint: "vs. the 3 months before users joined Linka",
  },
  {
    value: "4 min",
    label: "Time to first post",
    hint: "from signup → live post on your channel",
  },
  {
    value: "97%",
    label: "Drafts kept",
    hint: "approved with fewer than 3 word edits",
  },
];
