import { describe, it, expect } from "vitest";
import { sanitizeSearchInput } from "@/lib/sanitize";

describe("sanitizeSearchInput", () => {
  it("strips HTML tags", () => {
    expect(sanitizeSearchInput('<script>alert("xss")</script>Luke')).toBe("alertxssLuke");
  });

  it("removes dangerous characters", () => {
    expect(sanitizeSearchInput("luke'; DROP TABLE--")).toBe("luke DROP TABLE--");
  });

  it("enforces max length of 100 by default", () => {
    const long = "a".repeat(150);
    expect(sanitizeSearchInput(long)).toHaveLength(100);
  });

  it("trims whitespace", () => {
    expect(sanitizeSearchInput("  luke  ")).toBe("luke");
  });

  it("passes through clean input unchanged", () => {
    expect(sanitizeSearchInput("Luke Skywalker")).toBe("Luke Skywalker");
  });

  it("respects custom max length", () => {
    expect(sanitizeSearchInput("abcdefgh", 5)).toHaveLength(5);
  });
});
