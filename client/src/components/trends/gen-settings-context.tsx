"use client";

import { createContext, useContext } from "react";

// Generation settings chosen in the toolbar, read by each server-rendered
// idea row when it calls Generate.
export type GenSettingsValue = { language: string; withImage: boolean };

const GenSettingsContext = createContext<GenSettingsValue>({
  language: "en",
  withImage: true,
});

export const GenSettingsProvider = GenSettingsContext.Provider;

export function useGenSettings(): GenSettingsValue {
  return useContext(GenSettingsContext);
}
