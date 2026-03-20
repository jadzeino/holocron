import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OpeningCrawl } from "@/components/OpeningCrawl";

describe("OpeningCrawl", () => {
  const crawlText = "A long time ago in a galaxy far, far away...";

  it("renders the crawl text", () => {
    render(<OpeningCrawl text={crawlText} />);
    // Visible in the crawl + sr-only
    expect(screen.getAllByText(crawlText).length).toBeGreaterThanOrEqual(1);
  });

  it("has accessible sr-only text", () => {
    const { container } = render(<OpeningCrawl text={crawlText} />);
    const srOnly = container.querySelector(".sr-only");
    expect(srOnly?.textContent).toBe(crawlText);
  });

  it("toggles pause/resume", () => {
    render(<OpeningCrawl text={crawlText} />);
    const pauseBtn = screen.getByLabelText("Pause opening crawl");
    expect(pauseBtn).toBeInTheDocument();
    fireEvent.click(pauseBtn);
    expect(screen.getByLabelText("Resume opening crawl")).toBeInTheDocument();
    expect(screen.getByText("Resume Crawl")).toBeInTheDocument();
  });

  it("has a replay button", () => {
    render(<OpeningCrawl text={crawlText} />);
    expect(screen.getByLabelText("Replay opening crawl animation")).toBeInTheDocument();
  });

  it("replay resets pause state", () => {
    render(<OpeningCrawl text={crawlText} />);
    // Pause first
    fireEvent.click(screen.getByLabelText("Pause opening crawl"));
    expect(screen.getByText("Resume Crawl")).toBeInTheDocument();
    // Replay
    fireEvent.click(screen.getByLabelText("Replay opening crawl animation"));
    expect(screen.getByText("Pause Crawl")).toBeInTheDocument();
  });
});
