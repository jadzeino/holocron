import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchResourceList, fetchResourceDetail, fetchByUrl, parseSwapiUrl, getDisplayName } from "@/lib/swapi";

export function useResourceList(resource: string, page: number, search: string) {
  return useQuery({
    queryKey: ["resource-list", resource, page, search],
    queryFn: () => fetchResourceList(resource, page, search),
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
    enabled: !!resource,
  });
}

export function useResourceDetail(resource: string, id: string) {
  return useQuery({
    queryKey: ["resource-detail", resource, id],
    queryFn: () => fetchResourceDetail(resource, id),
    staleTime: 10 * 60 * 1000,
    enabled: !!resource && !!id,
  });
}

export function useRelatedResources(urls: string[], enabled: boolean = true) {
  return useQueries({
    queries: urls.map((url) => ({
      queryKey: ["related", url],
      queryFn: () => fetchByUrl(url),
      staleTime: 10 * 60 * 1000,
      enabled,
    })),
  });
}

export function useRelatedResource(url: string | null) {
  return useQuery({
    queryKey: ["related", url],
    queryFn: () => fetchByUrl(url!),
    staleTime: 10 * 60 * 1000,
    enabled: !!url,
  });
}

export { parseSwapiUrl, getDisplayName };
