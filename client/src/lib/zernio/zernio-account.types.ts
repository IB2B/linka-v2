export type Platform =
  | "linkedin"
  | "facebook"
  | "instagram"
  | "youtube"
  | "tiktok";

export type ZernioAccount = {
  id: string;
  platform: Platform;
  username: string;
  avatar_url: string | null;
  connected: boolean;
};
