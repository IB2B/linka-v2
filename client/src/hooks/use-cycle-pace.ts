import { useSyncExternalStore } from "react";
import { cycleElapsedPct } from "@/lib/usage/cycle-progress";

const subscribe = () => () => {};

// Billing-cycle progress read from the browser clock only. The server snapshot
// is undefined, so the pace tick appears after hydration instead of mismatching.
export function useCyclePace(resetsAt: string): number | undefined {
  return useSyncExternalStore(
    subscribe,
    () => Math.round(cycleElapsedPct(resetsAt)),
    () => undefined,
  );
}
