export type Platform =
  | "linkedin"
  | "facebook"
  | "instagram"
  | "twitter"
  | "threads"
  | "tiktok"
  | "pinterest"
  | "bluesky"
  | "reddit";

export type ZernioAccount = {
  id: string;
  platform: Platform;
  username: string;
  avatar_url: string | null;
  connected: boolean;
};
