import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ResourceIcon } from "@/components/ResourceIcon";
import { RESOURCES } from "@/lib/swapi";

describe("ResourceIcon", () => {
  it("renders an icon for each resource type", () => {
    RESOURCES.forEach((resource) => {
      const { container } = render(<ResourceIcon resource={resource} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeTruthy();
    });
  });

  it("applies custom className", () => {
    const { container } = render(<ResourceIcon resource="people" className="h-8 w-8" />);
    const svg = container.querySelector("svg");
    expect(svg?.classList.contains("h-8")).toBe(true);
  });
});
