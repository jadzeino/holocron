import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useResourceList } from "@/hooks/useResource";
import { useDebounce } from "@/hooks/useDebounce";
import { sanitizeSearchInput } from "@/lib/sanitize";
import { isResourceValid, type ResourceType } from "@/lib/swapi";
import { ResourceIcon } from "@/components/ResourceIcon";
import { Datacard } from "@/components/Datacard";
import { Pagination } from "@/components/Pagination";
import { ScanningLoader, ErrorState, EmptyState } from "@/components/StatusStates";
import { Topbar } from "@/components/Topbar";
import { motion } from "framer-motion";
import { usePageSEO } from "@/hooks/usePageSEO";

const RESOURCE_DESCRIPTIONS: Record<string, string> = {
  people: "Browse all characters from the Star Wars universe — heroes, villains, and everyone in between.",
  films: "Explore all Star Wars films with details on directors, producers, and release dates.",
  planets: "Discover planets across the Star Wars galaxy — from Tatooine to Coruscant.",
  species: "Learn about the diverse species that inhabit the Star Wars universe.",
  starships: "View starships from the Star Wars saga — fighters, cruisers, and freighters.",
  vehicles: "Explore ground and atmospheric vehicles from across the Star Wars galaxy.",
};

export default function ResourceListPage() {
  const { resource } = useParams<{ resource: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const sectorName = resource ? resource.charAt(0).toUpperCase() + resource.slice(1) : "Unknown";
  usePageSEO({
    title: sectorName,
    description: RESOURCE_DESCRIPTIONS[resource || ""] || `Browse ${resource} from the Star Wars universe.`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Star Wars ${sectorName}`,
      description: RESOURCE_DESCRIPTIONS[resource || ""],
      url: `https://jadzeino.github.io/holocron/${resource}`,
    },
  });

  const pageParam = Number(searchParams.get("page")) || 1;
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const prevResource = useRef(resource);
  // Clear search only when navigating to a different resource (not on initial mount)
  useEffect(() => {
    if (prevResource.current !== resource) {
      prevResource.current = resource;
      setSearch("");
      const params = new URLSearchParams(searchParams);
      params.delete("search");
      params.set("page", "1");
      setSearchParams(params);
    }
  }, [resource]);
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError, error } = useResourceList(
    resource || "",
    debouncedSearch !== (searchParams.get("search") || "") ? 1 : pageParam,
    debouncedSearch
  );

  if (!resource || !isResourceValid(resource)) {
    return (
      <div className="flex-1 flex flex-col">
        <Topbar searchValue="" onSearchChange={() => {}} showSearch={false} />
        <ErrorState message={`Unknown sector: ${resource}`} />
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const handleSearch = (value: string) => {
    const sanitized = sanitizeSearchInput(value);
    setSearch(sanitized);
    const params = new URLSearchParams(searchParams);
    if (sanitized) {
      params.set("search", sanitized);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const currentPage = debouncedSearch !== (searchParams.get("search") || "") ? 1 : pageParam;

  const searchPlaceholder = (() => {
    switch (resource) {
      case "films": return "SEARCH DATABASE BY TITLE...";
      case "starships":
      case "vehicles": return "SEARCH DATABASE BY NAME OR MODEL...";
      default: return "SEARCH DATABASE BY NAME...";
    }
  })();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Topbar searchValue={search} onSearchChange={handleSearch} searchPlaceholder={searchPlaceholder} />

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <motion.div
          key={resource}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="mb-6">
            <p className="font-tactical text-muted-foreground mb-1 flex items-center gap-2">
              SECTOR: <ResourceIcon resource={resource as ResourceType} className="h-3.5 w-3.5 inline" />
            </p>
            <h1 className="font-display text-xl md:text-2xl text-foreground">
              {resource}
            </h1>
            <p className="font-tactical text-muted-foreground mt-1">
              DATABASE_ACCESS_GRANTED
            </p>
          </div>

          {/* Content */}
          {isLoading ? (
            <ScanningLoader />
          ) : isError ? (
            <ErrorState message={error?.message || "Connection lost"} />
          ) : !data || data.results.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.results.map((item, i) => (
                  <Datacard
                    key={(item.url as string) || i}
                    item={item as Record<string, unknown>}
                    index={i}
                  />
                ))}
              </div>
              <Pagination
                page={currentPage}
                hasNext={!!data.next}
                hasPrev={!!data.previous}
                onPageChange={handlePageChange}
                total={data.count}
              />
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}
