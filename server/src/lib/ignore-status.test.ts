import { describe, expect, it } from "vitest";
import { ignoreStatus } from "./ignore-status";

const fail = (status: number) =>
  Promise.reject(Object.assign(new Error(`HTTP ${status}`), { status }));

describe("ignoreStatus", () => {
  it("passes a successful result through", async () => {
    await expect(ignoreStatus(Promise.resolve("ok"))).resolves.toBe("ok");
  });

  it("turns a 404 into null by default", async () => {
    await expect(ignoreStatus(fail(404))).resolves.toBeNull();
  });

  it("only swallows the statuses it was given", async () => {
    await expect(ignoreStatus(fail(400), [400, 404])).resolves.toBeNull();
    await expect(ignoreStatus(fail(500), [400, 404])).rejects.toThrow("HTTP 500");
  });

  it("rethrows errors that carry no status", async () => {
    await expect(ignoreStatus(Promise.reject(new Error("network")))).rejects.toThrow("network");
  });
});
