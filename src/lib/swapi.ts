import { z } from "zod";

const BASE_URL = "https://swapi.dev/api";

export const RESOURCES = ["people", "films", "planets", "species", "starships", "vehicles"] as const;
export type ResourceType = (typeof RESOURCES)[number];

// Base schema
const BaseResource = z.object({
  url: z.string().url(),
  created: z.string(),
  edited: z.string(),
});

// List response schema
export const ListResponseSchema = z.object({
  count: z.number(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(z.record(z.unknown())),
});

export type ListResponse = z.infer<typeof ListResponseSchema>;

// Resource schemas
export const PersonSchema = BaseResource.extend({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.string(),
  films: z.array(z.string()),
  species: z.array(z.string()),
  vehicles: z.array(z.string()),
  starships: z.array(z.string()),
});

export const FilmSchema = BaseResource.extend({
  title: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  director: z.string(),
  producer: z.string(),
  release_date: z.string(),
  characters: z.array(z.string()),
  planets: z.array(z.string()),
  starships: z.array(z.string()),
  vehicles: z.array(z.string()),
  species: z.array(z.string()),
});

export const PlanetSchema = BaseResource.extend({
  name: z.string(),
  rotation_period: z.string(),
  orbital_period: z.string(),
  diameter: z.string(),
  climate: z.string(),
  gravity: z.string(),
  terrain: z.string(),
  surface_water: z.string(),
  population: z.string(),
  residents: z.array(z.string()),
  films: z.array(z.string()),
});

export const SpeciesSchema = BaseResource.extend({
  name: z.string(),
  classification: z.string(),
  designation: z.string(),
  average_height: z.string(),
  skin_colors: z.string(),
  hair_colors: z.string(),
  eye_colors: z.string(),
  average_lifespan: z.string(),
  homeworld: z.string().nullable(),
  language: z.string(),
  people: z.array(z.string()),
  films: z.array(z.string()),
});

export const StarshipSchema = BaseResource.extend({
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  hyperdrive_rating: z.string(),
  MGLT: z.string(),
  starship_class: z.string(),
  pilots: z.array(z.string()),
  films: z.array(z.string()),
});

export const VehicleSchema = BaseResource.extend({
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  vehicle_class: z.string(),
  pilots: z.array(z.string()),
  films: z.array(z.string()),
});

const schemas: Record<ResourceType, z.ZodType> = {
  people: PersonSchema,
  films: FilmSchema,
  planets: PlanetSchema,
  species: SpeciesSchema,
  starships: StarshipSchema,
  vehicles: VehicleSchema,
};

export function getSchemaForResource(resource: ResourceType) {
  return schemas[resource];
}

// API client
export async function fetchResourceList(
  resource: string,
  page: number = 1,
  search: string = ""
): Promise<ListResponse> {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (search) params.set("search", search);

  const res = await fetch(`${BASE_URL}/${resource}/?${params}`);
  if (!res.ok) throw new Error(`Failed to fetch ${resource}: ${res.status}`);
  const data = await res.json();
  return ListResponseSchema.parse(data);
}

export async function fetchResourceDetail(
  resource: string,
  id: string
): Promise<Record<string, unknown>> {
  const res = await fetch(`${BASE_URL}/${resource}/${id}/`);
  if (!res.ok) throw new Error(`Failed to fetch ${resource}/${id}: ${res.status}`);
  const data = await res.json();
  const schema = schemas[resource as ResourceType];
  if (schema) return schema.parse(data) as Record<string, unknown>;
  return data;
}

export async function fetchByUrl(url: string): Promise<Record<string, unknown>> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

// Helpers
export function parseSwapiUrl(url: string): { resource: string; id: string } | null {
  const match = url.match(/\/api\/(\w+)\/(\d+)\/?$/);
  if (!match) return null;
  return { resource: match[1], id: match[2] };
}

export function getDisplayName(item: Record<string, unknown>): string {
  return (item.name as string) || (item.title as string) || "Unknown";
}

export function isResourceValid(resource: string): resource is ResourceType {
  return RESOURCES.includes(resource as ResourceType);
}

// Icon names mapped to resources — rendered as Lucide components in UI
export function getResourceIconName(resource: ResourceType): string {
  const icons: Record<ResourceType, string> = {
    people: "Users",
    films: "Film",
    planets: "Globe",
    species: "Dna",
    starships: "Rocket",
    vehicles: "Car",
  };
  return icons[resource];
}

// Keep for tests / plain-text contexts
export function getResourceIcon(resource: ResourceType): string {
  const icons: Record<ResourceType, string> = {
    people: "⊕",
    films: "◈",
    planets: "◉",
    species: "◇",
    starships: "△",
    vehicles: "▽",
  };
  return icons[resource];
}

// Get fields that are URLs (for related resources)
export function getUrlFields(item: Record<string, unknown>): Array<{ key: string; urls: string[] }> {
  const urlFields: Array<{ key: string; urls: string[] }> = [];
  for (const [key, value] of Object.entries(item)) {
    if (key === "url" || key === "created" || key === "edited") continue;
    if (typeof value === "string" && value.startsWith("https://swapi.dev/api/")) {
      urlFields.push({ key, urls: [value] });
    } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string" && value[0].startsWith("https://swapi.dev/api/")) {
      urlFields.push({ key, urls: value });
    }
  }
  return urlFields;
}

// Get non-URL fields (for display)
export function getDataFields(item: Record<string, unknown>): Array<{ key: string; value: string }> {
  const skip = ["url", "created", "edited"];
  const fields: Array<{ key: string; value: string }> = [];
  for (const [key, value] of Object.entries(item)) {
    if (skip.includes(key)) continue;
    if (typeof value === "string" && !value.startsWith("https://swapi.dev/api/")) {
      fields.push({ key, value });
    } else if (typeof value === "number") {
      fields.push({ key, value: String(value) });
    }
  }
  return fields;
}
