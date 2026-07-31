import { describe, expect, it } from "vitest";
import { tidy } from "./post-title";
import { titleLimitFor, requiresTitle } from "./title-limits";

describe("tidy", () => {
  it("strips wrapping quotes and a trailing full stop", () => {
    expect(tidy('"Killing daily standups made us ship more."', 80))
      .toBe("Killing daily standups made us ship more");
  });

  it("cuts on a word boundary when over the limit", () => {
    expect(tidy("Killing daily standups made the team ship more", 30))
      .toBe("Killing daily standups made");
  });

  it("hard-cuts when there is no late word boundary", () => {
    expect(tidy("Supercalifragilisticexpialidocious", 10)).toBe("Supercalif");
  });

  it("leaves a title inside the limit alone", () => {
    expect(tidy("Short enough", 80)).toBe("Short enough");
  });
});

describe("platform limits", () => {
  it("uses each platform's own ceiling", () => {
    expect(titleLimitFor("youtube")).toBe(100);
    expect(titleLimitFor("reddit")).toBe(300);
    expect(titleLimitFor("linkedin")).toBe(80);
    expect(titleLimitFor("mastodon")).toBe(80);
  });

  it("knows which platforms cannot publish without one", () => {
    expect(requiresTitle("reddit")).toBe(true);
    expect(requiresTitle("youtube")).toBe(true);
    expect(requiresTitle("linkedin")).toBe(false);
  });
});
