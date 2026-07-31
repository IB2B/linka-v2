import { LateApiError } from "./late-api";

// The provider caps profiles per plan and every linka user needs one of their
// own, so the cap is a hard ceiling on how many people can connect an account at
// all. Ours to fix by raising the plan or pruning unused profiles — never
// something the person clicking Connect can do anything about, and never a
// reason to show them our plan name.
export class ProfileLimitError extends Error {
  constructor(public detail: string) {
    super("Connecting accounts is at capacity. The team has been notified.");
  }
}

export function isProfileLimit(err: unknown): boolean {
  return err instanceof LateApiError
    && err.status === 403
    && /profile limit reached/i.test(err.message);
}
