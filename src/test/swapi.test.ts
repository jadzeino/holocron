import { describe, it, expect } from "vitest";
import {
  parseSwapiUrl,
  getDisplayName,
  isResourceValid,
  getDataFields,
  getUrlFields,
  getResourceIcon,
  RESOURCES,
} from "@/lib/swapi";

describe("parseSwapiUrl", () => {
  it("parses a valid SWAPI URL", () => {
    expect(parseSwapiUrl("https://swapi.dev/api/people/1/")).toEqual({
      resource: "people",
      id: "1",
    });
  });

  it("returns null for invalid URL", () => {
    expect(parseSwapiUrl("https://example.com")).toBeNull();
  });
});

describe("getDisplayName", () => {
  it("returns name if present", () => {
    expect(getDisplayName({ name: "Luke", url: "" })).toBe("Luke");
  });

  it("returns title if no name", () => {
    expect(getDisplayName({ title: "A New Hope", url: "" })).toBe("A New Hope");
  });

  it("returns Unknown as fallback", () => {
    expect(getDisplayName({ url: "" })).toBe("Unknown");
  });
});

describe("isResourceValid", () => {
  it("validates known resources", () => {
    RESOURCES.forEach((r) => expect(isResourceValid(r)).toBe(true));
  });

  it("rejects unknown resources", () => {
    expect(isResourceValid("droids")).toBe(false);
  });
});

describe("getDataFields", () => {
  it("extracts non-URL string fields", () => {
    const fields = getDataFields({
      name: "Luke",
      height: "172",
      url: "https://swapi.dev/api/people/1/",
      homeworld: "https://swapi.dev/api/planets/1/",
      created: "2014-12-09",
    });
    expect(fields).toEqual([
      { key: "name", value: "Luke" },
      { key: "height", value: "172" },
    ]);
  });
});

describe("getUrlFields", () => {
  it("extracts URL array fields", () => {
    const fields = getUrlFields({
      name: "Luke",
      films: ["https://swapi.dev/api/films/1/"],
      url: "https://swapi.dev/api/people/1/",
      created: "x",
      edited: "y",
    });
    expect(fields).toEqual([
      { key: "films", urls: ["https://swapi.dev/api/films/1/"] },
    ]);
  });
});

describe("getResourceIcon", () => {
  it("returns an icon for each resource", () => {
    RESOURCES.forEach((r) => {
      expect(getResourceIcon(r)).toBeTruthy();
    });
  });
});
