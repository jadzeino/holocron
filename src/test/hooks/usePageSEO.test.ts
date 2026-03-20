import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePageSEO } from "@/hooks/usePageSEO";

describe("usePageSEO", () => {
  beforeEach(() => {
    document.title = "";
    // Set up meta tags
    const ensureMeta = (attr: string, val: string) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr.includes("property") ? "property" : "name", val);
        document.head.appendChild(el);
      }
    };
    ensureMeta("name", "description");
    ensureMeta("property", "og:title");
    ensureMeta("property", "og:description");

    // Clean up JSON-LD
    document.querySelector('script[data-seo="jsonld"]')?.remove();
  });

  it("sets document title with suffix", () => {
    renderHook(() => usePageSEO({ title: "People", description: "All people" }));
    expect(document.title).toBe("People — Holocron");
  });

  it("uses special title for home page", () => {
    renderHook(() => usePageSEO({ title: "Holocron", description: "Home" }));
    expect(document.title).toBe("Holocron — Star Wars Database Terminal");
  });

  it("sets meta description", () => {
    renderHook(() => usePageSEO({ title: "Test", description: "Test description" }));
    const meta = document.querySelector('meta[name="description"]');
    expect(meta?.getAttribute("content")).toBe("Test description");
  });

  it("injects JSON-LD script when provided", () => {
    const jsonLd = { "@type": "WebSite", name: "Holocron" };
    renderHook(() => usePageSEO({ title: "Test", description: "Desc", jsonLd }));
    const script = document.querySelector('script[data-seo="jsonld"]');
    expect(script).toBeTruthy();
    expect(JSON.parse(script!.textContent!)).toEqual(jsonLd);
  });

  it("removes JSON-LD on unmount", () => {
    const jsonLd = { "@type": "WebSite" };
    const { unmount } = renderHook(() => usePageSEO({ title: "T", description: "D", jsonLd }));
    expect(document.querySelector('script[data-seo="jsonld"]')).toBeTruthy();
    unmount();
    expect(document.querySelector('script[data-seo="jsonld"]')).toBeNull();
  });
});
