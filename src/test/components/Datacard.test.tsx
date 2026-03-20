import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Datacard } from "@/components/Datacard";

describe("Datacard", () => {
  const mockItem = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    url: "https://swapi.dev/api/people/1/",
    created: "2014-12-09",
    edited: "2014-12-20",
    homeworld: "https://swapi.dev/api/planets/1/",
  };

  it("renders the item name", () => {
    render(
      <MemoryRouter>
        <Datacard item={mockItem} index={0} />
      </MemoryRouter>
    );
    expect(screen.getAllByText("Luke Skywalker").length).toBeGreaterThanOrEqual(1);
  });

  it("renders up to 4 data fields", () => {
    render(
      <MemoryRouter>
        <Datacard item={mockItem} index={0} />
      </MemoryRouter>
    );
    expect(screen.getByText("172")).toBeInTheDocument();
    expect(screen.getByText("77")).toBeInTheDocument();
  });

  it("links to the correct detail page", () => {
    render(
      <MemoryRouter>
        <Datacard item={mockItem} index={0} />
      </MemoryRouter>
    );
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/people/1");
  });

  it("returns null for invalid URL", () => {
    const { container } = render(
      <MemoryRouter>
        <Datacard item={{ name: "X", url: "invalid" }} index={0} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });
});
