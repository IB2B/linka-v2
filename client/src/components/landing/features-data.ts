import {
  Wand2, Layers, Image as ImageIcon, Video, Languages, Hash, Type,
  CalendarClock, Radar, Inbox, BarChart3, Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Icons in the same order as `landing.features.items` in the message files.
export const FEATURE_ICONS: LucideIcon[] = [
  Wand2, Layers, ImageIcon, Video, Languages, Hash, Type,
  CalendarClock, Radar, Inbox, BarChart3, Workflow,
];

// Indexes of features shipped recently enough to still be news — they get a
// "New" pill. Drop an index once it stops being new.
export const NEW_FEATURES: ReadonlySet<number> = new Set([1, 3, 4, 5, 6]);
