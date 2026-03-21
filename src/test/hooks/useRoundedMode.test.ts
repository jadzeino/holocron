import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRoundedMode } from "@/hooks/useRoundedMode";

describe("useRoundedMode", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("rounded-mode");
    document.documentElement.style.removeProperty("--radius");
  });

  it("defaults to not rounded", () => {
    const { result } = renderHook(() => useRoundedMode());
    expect(result.current.isRounded).toBe(false);
  });

  it("toggles rounded mode on", () => {
    const { result } = renderHook(() => useRoundedMode());
    act(() => result.current.toggle());
    expect(result.current.isRounded).toBe(true);
    expect(document.documentElement.classList.contains("rounded-mode")).toBe(true);
    expect(document.documentElement.style.getPropertyValue("--radius")).toBe("0.75rem");
  });

  it("toggles rounded mode off", () => {
    localStorage.setItem("holocron-rounded", "on");
    const { result } = renderHook(() => useRoundedMode());
    expect(result.current.isRounded).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isRounded).toBe(false);
    expect(document.documentElement.style.getPropertyValue("--radius")).toBe("0.125rem");
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useRoundedMode());
    act(() => result.current.toggle());
    expect(localStorage.getItem("holocron-rounded")).toBe("on");
  });
});
