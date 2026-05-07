export type Platform =
  | "linkedin"
  | "twitter"
  | "facebook"
  | "instagram"
  | "threads";

export type PlatformMeta = {
  value: Platform;
  label: string;
};

export const PLATFORMS: PlatformMeta[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter / X" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "threads", label: "Threads" },
];
