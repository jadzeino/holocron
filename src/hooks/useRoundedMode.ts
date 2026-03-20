import { useState, useEffect } from "react";

export function useRoundedMode() {
  const [isRounded, setIsRounded] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("holocron-rounded") === "on";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isRounded) {
      root.classList.add("rounded-mode");
      root.style.setProperty("--radius", "0.75rem");
    } else {
      root.classList.remove("rounded-mode");
      root.style.setProperty("--radius", "2px");
    }
    localStorage.setItem("holocron-rounded", isRounded ? "on" : "off");
  }, [isRounded]);

  return { isRounded, toggle: () => setIsRounded((r) => !r) };
}
