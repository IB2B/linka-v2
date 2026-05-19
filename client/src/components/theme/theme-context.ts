"use client";

import { createContext } from "react";

export type Theme = "light" | "dark" | "system";

export type ThemeContextValue = {
  theme: Theme | undefined;
  setTheme: (t: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: undefined,
  setTheme: () => {},
});
