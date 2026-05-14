export type ActivityWindow = { curr: number; prev: number };

export type ActivitySummary = {
  events: ActivityWindow;
  signups: ActivityWindow;
  posts: ActivityWindow;
  failures: ActivityWindow;
  byType: Record<string, number>;
};

export type AdminStats = {
  users: {
    total: number; active: number; suspended: number;
    newThisWeek: number; newPrevWeek: number;
  };
  posts: { total: number; thisMonth: number; prevMonth: number };
  subscriptions: { paying: number; free: number };
  tickets: { open: number; urgent: number };
  feedback: { newCount: number };
};
