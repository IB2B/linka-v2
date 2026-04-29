import {
  Newspaper,
  MessageSquare,
  BookOpen,
  Brain,
  HelpCircle,
  Trophy,
  Heart,
  Share2,
  Magnet,
  type LucideIcon,
} from "lucide-react";

import type { PostType } from "@/types/content";

export type PostTypeMeta = {
  type: PostType;
  label: string;
  icon: LucideIcon;
  description: string;
};

export const POST_TYPES: PostTypeMeta[] = [
  {
    type: "news_commentary",
    label: "News commentary",
    icon: Newspaper,
    description: "React to a trending article",
  },
  {
    type: "personal_insight",
    label: "Personal insight",
    icon: MessageSquare,
    description: "Share a story from your work",
  },
  {
    type: "how_to_guide",
    label: "How-to guide",
    icon: BookOpen,
    description: "Walk readers through a process",
  },
  {
    type: "thought_leadership",
    label: "Thought leadership",
    icon: Brain,
    description: "Take a stance in your industry",
  },
  {
    type: "question_engagement",
    label: "Question",
    icon: HelpCircle,
    description: "Ask the network for input",
  },
  {
    type: "achievement",
    label: "Achievement",
    icon: Trophy,
    description: "Celebrate a recent win",
  },
  {
    type: "motivational",
    label: "Motivational",
    icon: Heart,
    description: "Inspire with a lesson",
  },
  {
    type: "curated_content",
    label: "Curated",
    icon: Share2,
    description: "Round up resources you love",
  },
  {
    type: "lead_magnet",
    label: "Lead magnet",
    icon: Magnet,
    description: "Drive interest to your offer",
  },
];

export const RANDOM_TYPES: PostType[] = POST_TYPES.filter(
  (p) => p.type !== "news_commentary",
).map((p) => p.type);

export function getPostTypeMeta(type: PostType): PostTypeMeta {
  return POST_TYPES.find((p) => p.type === type) ?? POST_TYPES[0];
}
