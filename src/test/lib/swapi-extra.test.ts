import { describe, it, expect } from "vitest";
import { getResourceIconName, getSchemaForResource, getUrlFields, getDataFields } from "@/lib/swapi";

describe("getResourceIconName", () => {
  it("returns correct icon names", () => {
    expect(getResourceIconName("people")).toBe("Users");
    expect(getResourceIconName("films")).toBe("Film");
    expect(getResourceIconName("planets")).toBe("Globe");
    expect(getResourceIconName("species")).toBe("Dna");
    expect(getResourceIconName("starships")).toBe("Rocket");
    expect(getResourceIconName("vehicles")).toBe("Car");
  });
});

describe("getSchemaForResource", () => {
  it("returns a schema for each resource", () => {
    expect(getSchemaForResource("people")).toBeTruthy();
    expect(getSchemaForResource("films")).toBeTruthy();
  });
});

describe("getUrlFields - single URL string field", () => {
  it("extracts single URL as array", () => {
    const fields = getUrlFields({
      name: "Luke",
      homeworld: "https://swapi.dev/api/planets/1/",
      url: "https://swapi.dev/api/people/1/",
    });
    expect(fields).toEqual([
      { key: "homeworld", urls: ["https://swapi.dev/api/planets/1/"] },
    ]);
  });
});

describe("getDataFields - number fields", () => {
  it("includes number fields as strings", () => {
    const fields = getDataFields({
      episode_id: 4,
      url: "https://swapi.dev/api/films/1/",
      created: "x",
      edited: "y",
    });
    expect(fields).toEqual([{ key: "episode_id", value: "4" }]);
  });
});
