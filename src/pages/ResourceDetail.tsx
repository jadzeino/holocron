import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useResourceDetail } from "@/hooks/useResource";
import { isResourceValid, getDisplayName, getDataFields, getUrlFields, type ResourceType } from "@/lib/swapi";
import { ResourceIcon } from "@/components/ResourceIcon";
import { RelatedSection } from "@/components/RelatedSection";
import { ScanningLoader, ErrorState } from "@/components/StatusStates";
import { Topbar } from "@/components/Topbar";
import { OpeningCrawl } from "@/components/OpeningCrawl";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { usePageSEO } from "@/hooks/usePageSEO";

function buildJsonLd(resource: string, data: Record<string, unknown>) {
  const name = getDisplayName(data);
  switch (resource) {
    case "films":
      return {
        "@context": "https://schema.org",
        "@type": "Movie",
        name,
        director: data.director,
        producer: data.producer,
        datePublished: data.release_date,
        description: typeof data.opening_crawl === "string" ? data.opening_crawl.slice(0, 200) : undefined,
      };
    case "people":
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        birthDate: data.birth_year,
      };
    case "planets":
      return {
        "@context": "https://schema.org",
        "@type": "Place",
        name,
        description: `Climate: ${data.climate}, Terrain: ${data.terrain}`,
      };
    default:
      return {
        "@context": "https://schema.org",
        "@type": "Thing",
        name,
      };
  }
}

export default function ResourceDetailPage() {
  const { resource, id } = useParams<{ resource: string; id: string }>();
  const { data, isLoading, isError, error } = useResourceDetail(resource || "", id || "");

  const displayName = data ? getDisplayName(data) : "Loading...";
  const jsonLd = useMemo(() => (data && resource ? buildJsonLd(resource, data) : undefined), [data, resource]);

  usePageSEO({
    title: displayName,
    description: data
      ? `${displayName} — ${resource} details from the Star Wars database.`
      : `Loading ${resource} details...`,
    jsonLd,
  });

  if (!resource || !isResourceValid(resource)) {
    return (
      <div className="flex-1 flex flex-col">
        <Topbar searchValue="" onSearchChange={() => {}} showSearch={false} />
        <ErrorState message={`Unknown sector: ${resource}`} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Topbar searchValue="" onSearchChange={() => {}} showSearch={false} />

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <Link
          to={`/${resource}`}
          className="inline-flex items-center gap-2 font-tactical text-muted-foreground hover:text-accent transition-colors mb-4 focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <ArrowLeft className="h-3 w-3" />
          BACK TO {resource.toUpperCase()}
        </Link>

        {isLoading ? (
          <ScanningLoader text="DECRYPTING" />
        ) : isError ? (
          <ErrorState message={error?.message || "Signal lost"} />
        ) : !data ? (
          <ErrorState message="No data received" />
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Title */}
            <div className="mb-6">
              <p className="font-tactical text-muted-foreground mb-1 flex items-center gap-2">
                <ResourceIcon resource={resource as ResourceType} className="h-3.5 w-3.5" /> {resource.toUpperCase()} // DETAIL
              </p>
              <h1 className="font-starwars text-xl md:text-2xl text-accent glow-text">
                {getDisplayName(data)}
              </h1>
            </div>

            {/* Opening Crawl for Films */}
            {resource === "films" && typeof data.opening_crawl === "string" && (
              <div className="mb-8">
                <h2 className="font-tactical text-muted-foreground mb-3 border-b border-border pb-2">
                  OPENING CRAWL
                </h2>
                <OpeningCrawl text={data.opening_crawl} />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Core Data */}
              <section aria-label="Core data">
                <h2 className="font-tactical text-muted-foreground mb-3 border-b border-border pb-2">
                  CORE DATA
                </h2>
                <div className="space-y-2">
                  {getDataFields(data).map(({ key, value }) => (
                    <div key={key} className="flex justify-between items-baseline border-b border-border/50 pb-1.5">
                      <span className="font-tactical text-muted-foreground">
                        {key.replace(/_/g, " ")}
                      </span>
                      <span className="text-sm text-foreground text-right max-w-[60%] truncate">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Signals */}
              <section aria-label="Related signals">
                <h2 className="font-tactical text-muted-foreground mb-3 border-b border-border pb-2">
                  RELATED SIGNALS
                </h2>
                <div className="space-y-2">
                  {getUrlFields(data).length === 0 ? (
                    <p className="font-tactical text-muted-foreground text-xs">NO LINKED SIGNALS</p>
                  ) : (
                    getUrlFields(data).map(({ key, urls }) => (
                      <RelatedSection key={key} label={key} urls={urls} />
                    ))
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
