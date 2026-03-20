import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
}

export function usePageSEO({ title, description, jsonLd }: SEOProps) {
  useEffect(() => {
    const fullTitle = title === "Holocron" ? "Holocron — Star Wars Database Terminal" : `${title} — Holocron`;
    document.title = fullTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }

    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", fullTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    // JSON-LD
    let scriptTag = document.querySelector('script[data-seo="jsonld"]') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        scriptTag.setAttribute("data-seo", "jsonld");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup JSON-LD on unmount
      const tag = document.querySelector('script[data-seo="jsonld"]');
      if (tag) tag.remove();
    };
  }, [title, description, jsonLd]);
}
