import type { GeneratedPost, PostStatus } from "@/types/post";

export type CalendarDay = {
  date: Date;
  key: string;
  inMonth: boolean;
  isToday: boolean;
  posts: GeneratedPost[];
};

export type StatusFilter = "all" | PostStatus;
export type PlatformFilter = "all" | string;
