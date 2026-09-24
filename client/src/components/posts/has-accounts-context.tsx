"use client";

import { createContext, useContext, type ReactNode } from "react";

// Whether the user has at least one social account connected. Defaults to
// true so a list rendered outside the provider never locks its buttons.
const HasAccountsContext = createContext(true);

export function HasAccountsProvider({ value, children }: { value: boolean; children: ReactNode }) {
  return <HasAccountsContext.Provider value={value}>{children}</HasAccountsContext.Provider>;
}

export function useHasAccounts(): boolean {
  return useContext(HasAccountsContext);
}
