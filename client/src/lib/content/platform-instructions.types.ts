export type LogoPlacement =
  | "top_left" | "top_right" | "bottom_left" | "bottom_right";

export type BrandKit = {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
  headingFont?: string;
  bodyFont?: string;
  logoUrl?: string;
  logoOnImages?: boolean;
  logoPlacement?: LogoPlacement;
};

export const LOGO_PLACEMENTS: { value: LogoPlacement; label: string }[] = [
  { value: "bottom_right", label: "Bottom right" },
  { value: "bottom_left", label: "Bottom left" },
  { value: "top_right", label: "Top right" },
  { value: "top_left", label: "Top left" },
];

export type PlatformInstructions = {
  platform: string;
  whoIAm: string;
  whatIDo: string;
  goals: string;
  interests: string;
  postTypes: string;
  tone: string;
  visualStyle: string;
  extraNotes: string;
  brandKit: BrandKit;
};

// Pseudo-platform holding the brief the user writes once for every platform.
export const GLOBAL_PLATFORM = "global";

export const EMPTY_INSTRUCTIONS: Omit<PlatformInstructions, "platform"> = {
  whoIAm: "",
  whatIDo: "",
  goals: "",
  interests: "",
  postTypes: "",
  tone: "",
  visualStyle: "",
  extraNotes: "",
  brandKit: {},
};
