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
  competitorLinks: string[];
};

export const EMPTY_INSTRUCTIONS: Omit<PlatformInstructions, "platform"> = {
  whoIAm: "",
  whatIDo: "",
  goals: "",
  interests: "",
  postTypes: "",
  tone: "",
  visualStyle: "",
  extraNotes: "",
  competitorLinks: [],
};
