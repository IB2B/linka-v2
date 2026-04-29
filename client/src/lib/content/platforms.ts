import {
  Briefcase,
  Hash,
  Users,
  Camera,
  AtSign,
  type LucideIcon,
} from "lucide-react";

export type Platform =
  | "linkedin"
  | "twitter"
  | "facebook"
  | "instagram"
  | "threads";

export type PlatformMeta = {
  value: Platform;
  label: string;
  icon: LucideIcon;
};

export const PLATFORMS: PlatformMeta[] = [
  { value: "linkedin", label: "LinkedIn", icon: Briefcase },
  { value: "twitter", label: "Twitter / X", icon: Hash },
  { value: "facebook", label: "Facebook", icon: Users },
  { value: "instagram", label: "Instagram", icon: Camera },
  { value: "threads", label: "Threads", icon: AtSign },
];
