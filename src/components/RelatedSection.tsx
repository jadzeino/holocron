import { useState } from "react";
import { Link } from "react-router-dom";
import { useRelatedResources } from "@/hooks/useResource";
import { parseSwapiUrl, getDisplayName } from "@/lib/swapi";
import { ChevronDown, ChevronRight } from "lucide-react";

interface RelatedSectionProps {
  label: string;
  urls: string[];
}

export function RelatedSection({ label, urls }: RelatedSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const results = useRelatedResources(urls, expanded);

  const isLoading = results.some((r) => r.isLoading);

  return (
    <div className="border border-border rounded-[var(--radius)] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
        aria-expanded={expanded}
        aria-controls={`related-${label}`}
      >
        <span className="font-tactical text-muted-foreground">
          {label.replace(/_/g, " ")} ({urls.length})
        </span>
        {expanded ? (
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div id={`related-${label}`} className="border-t border-border px-3 py-2 space-y-1">
          {isLoading ? (
            <p className="font-tactical text-muted-foreground text-xs animate-pulse">
              DECRYPTING SIGNALS...
            </p>
          ) : (
            results.map((result, i) => {
              if (!result.data) return null;
              const parsed = parseSwapiUrl(urls[i]);
              if (!parsed) return null;
              const name = getDisplayName(result.data);
              return (
                <Link
                  key={urls[i]}
                  to={`/${parsed.resource}/${parsed.id}`}
                  className="block text-xs text-accent hover:underline py-0.5 focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  ↳ {name}
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
