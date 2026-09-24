import { describe, expect, it } from "vitest";
import { tierForStatus } from "./subscription-access";

describe("tierForStatus", () => {
  it("keeps the paid plan while the subscription is paid or being retried", () => {
    for (const s of ["active", "trialing", "past_due"] as const) {
      expect(tierForStatus(s, "pro")).toBe("pro");
    }
  });

  it("falls back to free once the subscription has ended or is unpaid", () => {
    for (const s of ["canceled", "unpaid", "incomplete", "incomplete_expired", "paused"] as const) {
      expect(tierForStatus(s, "professional")).toBe("free");
    }
  });
});
