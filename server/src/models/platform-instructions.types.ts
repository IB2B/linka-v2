import type { BrandKit } from "../lib/brand-kit";

export type PlatformInstructionsRow = {
  platform: string;
  who_i_am: string | null;
  what_i_do: string | null;
  goals: string | null;
  interests: string | null;
  post_types: string | null;
  tone: string | null;
  visual_style: string | null;
  brand_kit: BrandKit | null;
  reference_accounts: string[] | null;
  extra_notes: string | null;
};

export type InstructionsInput = {
  whoIAm?: string;
  whatIDo?: string;
  goals?: string;
  interests?: string;
  postTypes?: string;
  tone?: string;
  visualStyle?: string;
  extraNotes?: string;
  brandKit?: BrandKit;
  referenceAccounts?: string[];
};
