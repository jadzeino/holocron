import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "@/components/Pagination";

describe("Pagination", () => {
  const defaultProps = {
    page: 2,
    hasNext: true,
    hasPrev: true,
    onPageChange: vi.fn(),
    total: 50,
  };

  it("displays record count and page info", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText(/50 RECORDS/)).toBeInTheDocument();
    expect(screen.getByText(/PAGE 2 OF 5/)).toBeInTheDocument();
  });

  it("calls onPageChange on prev click", () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange on next click", () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables prev when hasPrev is false", () => {
    render(<Pagination {...defaultProps} hasPrev={false} />);
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables next when hasNext is false", () => {
    render(<Pagination {...defaultProps} hasNext={false} />);
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("shows jump input when GO TO is clicked", () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Jump to page"));
    expect(screen.getByPlaceholderText("1–5")).toBeInTheDocument();
  });

  it("jumps to a valid page", () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText("Jump to page"));
    const input = screen.getByPlaceholderText("1–5");
    fireEvent.change(input, { target: { value: "4" } });
    fireEvent.click(screen.getByText("GO"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("does not jump to invalid page", () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText("Jump to page"));
    const input = screen.getByPlaceholderText("1–5");
    fireEvent.change(input, { target: { value: "99" } });
    fireEvent.click(screen.getByText("GO"));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("disables GO TO when only 1 page", () => {
    render(<Pagination {...defaultProps} total={5} />);
    expect(screen.getByLabelText("Jump to page")).toBeDisabled();
  });
});
