import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScanningLoader, ErrorState, EmptyState } from "@/components/StatusStates";

describe("ScanningLoader", () => {
  it("renders default scanning text", () => {
    render(<ScanningLoader />);
    expect(screen.getByText("SCANNING...")).toBeInTheDocument();
  });

  it("renders custom text", () => {
    render(<ScanningLoader text="LOADING" />);
    expect(screen.getByText("LOADING...")).toBeInTheDocument();
  });

  it("has loading role", () => {
    render(<ScanningLoader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

describe("ErrorState", () => {
  it("renders error message", () => {
    render(<ErrorState message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("SIGNAL ERROR")).toBeInTheDocument();
  });

  it("has alert role", () => {
    render(<ErrorState message="err" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});

describe("EmptyState", () => {
  it("renders default message", () => {
    render(<EmptyState />);
    expect(screen.getByText("NO SIGNALS DETECTED IN THIS QUADRANT.")).toBeInTheDocument();
  });

  it("renders custom message", () => {
    render(<EmptyState message="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});
