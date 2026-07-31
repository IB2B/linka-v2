import { describe, expect, it } from "vitest";
import { sanitizePost } from "./post-sanitize";

const tail = (text: string, platform = "linkedin") =>
  sanitizePost(text, platform).split("\n").pop();

describe("spelled-out tags", () => {
  it("rewrites a whole line of them", () => {
    expect(tail("Body.\n\nhashtag leadership hashtag operations"))
      .toBe("#leadership #operations");
  });

  it("handles the half-corrected form", () => {
    expect(tail("Body.\n\nhashtag #leadership hashtag #operations"))
      .toBe("#leadership #operations");
  });

  it("keeps non-English words", () => {
    expect(tail("Corpo.\n\nhashtag leadership hashtag operazioni"))
      .toBe("#leadership #operazioni");
  });

  it("leaves the word alone inside a sentence", () => {
    const prose = "I never use a hashtag anymore, they feel dated.";
    expect(sanitizePost(prose)).toBe(prose);
  });
});

describe("per-platform caps", () => {
  const six = "Body.\n\n#a #b #c #d #e #f";

  it("trims LinkedIn to 3", () => {
    expect(tail(six)).toBe("#a #b #c");
  });

  it("trims X to 2", () => {
    expect(tail(six, "twitter")).toBe("#a #b");
  });

  it("allows Instagram 5", () => {
    expect(tail(six, "instagram")).toBe("#a #b #c #d #e");
  });

  it("strips them entirely on Reddit and Facebook", () => {
    expect(sanitizePost(six, "reddit")).toBe("Body.");
    expect(sanitizePost(six, "facebook")).toBe("Body.");
  });

  it("falls back to 3 for an unknown platform", () => {
    expect(tail(six, "mastodon")).toBe("#a #b #c");
  });
});

describe("tidying", () => {
  it("drops case-duplicate tags", () => {
    expect(tail("Body.\n\n#Growth #growth #ops")).toBe("#Growth #ops");
  });

  it("collapses tags spread over several lines", () => {
    expect(sanitizePost("Body.\n\n#a #b\n#c\n\n#d"))
      .toBe("Body.\n\n#a #b #c");
  });

  it("strips separators the model leaves behind", () => {
    expect(tail("Body.\n\n#a, #b; #c.")).toBe("#a #b #c");
  });

  it("puts a blank line before the tag block", () => {
    expect(sanitizePost("Body.\n#a #b")).toBe("Body.\n\n#a #b");
  });

  it("leaves a post with no tags untouched", () => {
    expect(sanitizePost("Just a body.\n\nAnd a question?"))
      .toBe("Just a body.\n\nAnd a question?");
  });

  it("does not mistake a numbered list for tags", () => {
    const list = "Body.\n\n#1. Ship it";
    expect(sanitizePost(list)).toBe(list);
  });
});
