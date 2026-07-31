import { describe, expect, it } from "vitest";
import { sanitizePost } from "./post-sanitize";

const tail = (text: string) => sanitizePost(text).split("\n").pop();

describe("sanitizePost", () => {
  it("rewrites a spelled-out tag line", () => {
    expect(tail("Body.\n\nhashtag leadership hashtag operations"))
      .toBe("#leadership #operations");
  });

  it("handles the half-corrected form the model also emits", () => {
    expect(tail("Body.\n\nhashtag #leadership hashtag #operations"))
      .toBe("#leadership #operations");
  });

  it("rewrites a single tag", () => {
    expect(tail("Body.\n\nhashtag growth")).toBe("#growth");
  });

  it("keeps non-English tags", () => {
    expect(tail("Corpo.\n\nhashtag leadership hashtag operazioni"))
      .toBe("#leadership #operazioni");
  });

  it("leaves the word alone inside a sentence", () => {
    const prose = "I never use a hashtag anymore, they feel dated.";
    expect(sanitizePost(prose)).toBe(prose);
  });

  it("leaves correct tags untouched", () => {
    expect(tail("Body.\n\n#leadership #operations")).toBe("#leadership #operations");
  });
});
