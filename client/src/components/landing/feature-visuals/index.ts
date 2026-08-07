import type { ComponentType } from "react";

import { VisualVoice } from "./visual-voice";
import { VisualFanout } from "./visual-fanout";
import { VisualImage } from "./visual-image";
import { VisualAvatar } from "./visual-avatar";
import { VisualLanguage } from "./visual-language";
import { VisualHashtags } from "./visual-hashtags";
import { VisualTitle } from "./visual-title";
import { VisualCalendar } from "./visual-calendar";
import { VisualRadar } from "./visual-radar";
import { VisualInbox } from "./visual-inbox";
import { VisualAnalytics } from "./visual-analytics";
import { VisualPipeline } from "./visual-pipeline";

// Same order as `landing.features.items` in the message files.
export const FEATURE_VISUALS: ComponentType[] = [
  VisualVoice, VisualFanout, VisualImage, VisualAvatar,
  VisualLanguage, VisualHashtags, VisualTitle, VisualCalendar,
  VisualRadar, VisualInbox, VisualAnalytics, VisualPipeline,
];
