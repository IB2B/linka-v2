// Mirrors GET /api/users/me/usage.
export type UsageSummary = {
  tier: string;
  posts: { used: number; limit: number; resetsAt: string };
  images: { used: number; limit: number };
  videos: { used: number; limit: number; allowed: boolean };
};
