import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "@/hooks/useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("defaults to dark mode", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(true);
  });

  it("toggles to light mode", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.isDark).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists preference in localStorage", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(localStorage.getItem("holocron-theme")).toBe("light");
    act(() => result.current.toggle());
    expect(localStorage.getItem("holocron-theme")).toBe("dark");
  });

  it("reads stored preference", () => {
    localStorage.setItem("holocron-theme", "light");
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(false);
  });
});
