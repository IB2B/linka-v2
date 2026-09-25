import { describe, expect, it, vi, beforeEach } from "vitest";

import { deleteUpload } from "./upload-delete";

const { unlink } = vi.hoisted(() => ({ unlink: vi.fn(async (_path: string) => {}) }));
vi.mock("node:fs/promises", () => ({ unlink }));

describe("deleteUpload", () => {
  beforeEach(() => unlink.mockClear());

  it("removes a file in a known upload folder", async () => {
    await deleteUpload("/uploads/avatars/abc-123.png");
    expect(unlink).toHaveBeenCalledTimes(1);
    expect(unlink.mock.calls[0][0]).toMatch(/uploads[\\/]avatars[\\/]abc-123\.png$/);
  });

  it("ignores traversal, unknown folders and remote URLs", async () => {
    for (const p of [
      "/uploads/avatars/../../.env",
      "/uploads/avatars/..",
      "/uploads/images/.env",
      "/uploads/avatars/..%2F.env",
      "/uploads/secret/x.png",
      "/uploads/images/",
      "https://cdn.example.com/uploads/images/x.png",
      "",
    ]) await deleteUpload(p);
    expect(unlink).not.toHaveBeenCalled();
  });

  it("treats an already missing file as deleted", async () => {
    unlink.mockRejectedValueOnce(Object.assign(new Error("gone"), { code: "ENOENT" }));
    await expect(deleteUpload("/uploads/images/x.png")).resolves.toBeUndefined();
  });

  it("surfaces any other file system error", async () => {
    unlink.mockRejectedValueOnce(Object.assign(new Error("busy"), { code: "EBUSY" }));
    await expect(deleteUpload("/uploads/images/x.png")).rejects.toThrow("busy");
  });
});
