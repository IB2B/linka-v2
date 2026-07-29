export type BrandKit = {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
  headingFont?: string;
  bodyFont?: string;
};

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
  referenceAccounts: string[];
};

export const MAX_REFERENCE_ACCOUNTS = 5;

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
  referenceAccounts: [],
};
