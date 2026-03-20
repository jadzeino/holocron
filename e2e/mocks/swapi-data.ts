/**
 * Mock SWAPI data for deterministic e2e tests.
 * These fixtures replace live API calls so tests are fast, offline-capable,
 * and immune to upstream data changes.
 */

// ─── People ───────────────────────────────────────────────────────────────────

const luke = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/1/",
  films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/", "https://swapi.dev/api/films/3/"],
  species: [],
  vehicles: ["https://swapi.dev/api/vehicles/14/"],
  starships: ["https://swapi.dev/api/starships/12/"],
  url: "https://swapi.dev/api/people/1/",
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:56.891000Z",
};

const leia = {
  name: "Leia Organa",
  height: "150",
  mass: "49",
  hair_color: "brown",
  skin_color: "light",
  eye_color: "brown",
  birth_year: "19BBY",
  gender: "female",
  homeworld: "https://swapi.dev/api/planets/2/",
  films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/"],
  species: [],
  vehicles: [],
  starships: [],
  url: "https://swapi.dev/api/people/5/",
  created: "2014-12-10T15:20:09.791000Z",
  edited: "2014-12-20T21:17:50.315000Z",
};

const darthVader = {
  name: "Darth Vader",
  height: "202",
  mass: "136",
  hair_color: "none",
  skin_color: "white",
  eye_color: "yellow",
  birth_year: "41.9BBY",
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/1/",
  films: ["https://swapi.dev/api/films/1/"],
  species: [],
  vehicles: [],
  starships: ["https://swapi.dev/api/starships/13/"],
  url: "https://swapi.dev/api/people/4/",
  created: "2014-12-10T15:18:20.704000Z",
  edited: "2014-12-20T21:17:50.313000Z",
};

function makePerson(id: number, name: string) {
  return {
    name,
    height: "170",
    mass: "70",
    hair_color: "brown",
    skin_color: "fair",
    eye_color: "brown",
    birth_year: "unknown",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/"],
    species: [],
    vehicles: [],
    starships: [],
    url: `https://swapi.dev/api/people/${id}/`,
    created: "2014-12-10T15:18:20.704000Z",
    edited: "2014-12-20T21:17:50.313000Z",
  };
}

// Page 1: 10 people, Page 2: 10 more, … total 82 → 9 pages
const peoplePage1 = [
  luke,
  makePerson(2, "C-3PO"),
  makePerson(3, "R2-D2"),
  darthVader,
  leia,
  makePerson(6, "Owen Lars"),
  makePerson(7, "Beru Whitesun Lars"),
  makePerson(8, "R5-D4"),
  makePerson(9, "Biggs Darklighter"),
  makePerson(10, "Obi-Wan Kenobi"),
];

const peoplePage2 = Array.from({ length: 10 }, (_, i) =>
  makePerson(11 + i, `Person ${11 + i}`)
);

const peoplePage3 = Array.from({ length: 10 }, (_, i) =>
  makePerson(21 + i, `Person ${21 + i}`)
);

const peoplePage4 = Array.from({ length: 10 }, (_, i) =>
  makePerson(31 + i, `Person ${31 + i}`)
);

const peoplePage5 = Array.from({ length: 10 }, (_, i) =>
  makePerson(41 + i, `Person ${41 + i}`)
);

const peoplePage6 = Array.from({ length: 10 }, (_, i) =>
  makePerson(51 + i, `Person ${51 + i}`)
);

const peoplePage7 = Array.from({ length: 10 }, (_, i) =>
  makePerson(61 + i, `Person ${61 + i}`)
);

const peoplePage8 = Array.from({ length: 10 }, (_, i) =>
  makePerson(71 + i, `Person ${71 + i}`)
);

const peoplePage9 = [makePerson(81, "Person 81"), makePerson(82, "Person 82")];

// ─── Films ────────────────────────────────────────────────────────────────────

const aNewHope = {
  title: "A New Hope",
  episode_id: 4,
  opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base...",
  director: "George Lucas",
  producer: "Gary Kurtz, Rick McCallum",
  release_date: "1977-05-25",
  characters: ["https://swapi.dev/api/people/1/"],
  planets: ["https://swapi.dev/api/planets/1/"],
  starships: ["https://swapi.dev/api/starships/12/"],
  vehicles: ["https://swapi.dev/api/vehicles/14/"],
  species: ["https://swapi.dev/api/species/1/"],
  url: "https://swapi.dev/api/films/1/",
  created: "2014-12-10T14:23:31.880000Z",
  edited: "2014-12-20T19:49:45.256000Z",
};

function makeFilm(id: number, title: string) {
  return {
    title,
    episode_id: id,
    opening_crawl: "A long time ago...",
    director: "George Lucas",
    producer: "Gary Kurtz",
    release_date: "1980-05-17",
    characters: ["https://swapi.dev/api/people/1/"],
    planets: ["https://swapi.dev/api/planets/1/"],
    starships: [],
    vehicles: [],
    species: [],
    url: `https://swapi.dev/api/films/${id}/`,
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-20T19:49:45.256000Z",
  };
}

const allFilms = [
  aNewHope,
  makeFilm(2, "The Empire Strikes Back"),
  makeFilm(3, "Return of the Jedi"),
  makeFilm(4, "The Phantom Menace"),
  makeFilm(5, "Attack of the Clones"),
  makeFilm(6, "Revenge of the Sith"),
];

// ─── Planets ──────────────────────────────────────────────────────────────────

const tatooine = {
  name: "Tatooine",
  rotation_period: "23",
  orbital_period: "304",
  diameter: "10465",
  climate: "arid",
  gravity: "1 standard",
  terrain: "desert",
  surface_water: "1",
  population: "200000",
  residents: ["https://swapi.dev/api/people/1/"],
  films: ["https://swapi.dev/api/films/1/"],
  url: "https://swapi.dev/api/planets/1/",
  created: "2014-12-09T13:50:49.641000Z",
  edited: "2014-12-20T20:58:18.411000Z",
};

function makePlanet(id: number, name: string) {
  return {
    name,
    rotation_period: "24",
    orbital_period: "365",
    diameter: "12500",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grasslands",
    surface_water: "40",
    population: "1000000",
    residents: [],
    films: ["https://swapi.dev/api/films/1/"],
    url: `https://swapi.dev/api/planets/${id}/`,
    created: "2014-12-10T11:35:48.479000Z",
    edited: "2014-12-20T20:58:18.420000Z",
  };
}

const planetsPage1 = [
  tatooine,
  makePlanet(2, "Alderaan"),
  ...Array.from({ length: 8 }, (_, i) => makePlanet(3 + i, `Planet ${3 + i}`)),
];

// ─── Species ──────────────────────────────────────────────────────────────────

function makeSpecies(id: number, name: string) {
  return {
    name,
    classification: "mammal",
    designation: "sentient",
    average_height: "180",
    skin_colors: "fair",
    hair_colors: "brown",
    eye_colors: "brown",
    average_lifespan: "120",
    homeworld: "https://swapi.dev/api/planets/1/",
    language: "Galactic Basic",
    people: ["https://swapi.dev/api/people/1/"],
    films: ["https://swapi.dev/api/films/1/"],
    url: `https://swapi.dev/api/species/${id}/`,
    created: "2014-12-10T13:52:11.567000Z",
    edited: "2014-12-20T21:36:42.136000Z",
  };
}

const speciesPage1 = Array.from({ length: 10 }, (_, i) =>
  makeSpecies(i + 1, i === 0 ? "Human" : `Species ${i + 1}`)
);

// ─── Starships ────────────────────────────────────────────────────────────────

const deathStar = {
  name: "Death Star",
  model: "DS-1 Orbital Battle Station",
  manufacturer: "Imperial Department of Military Research",
  cost_in_credits: "1000000000000",
  length: "120000",
  max_atmosphering_speed: "n/a",
  crew: "342,953",
  passengers: "843,342",
  cargo_capacity: "1000000000000",
  consumables: "3 years",
  hyperdrive_rating: "4.0",
  MGLT: "10",
  starship_class: "Deep Space Mobile Battlestation",
  pilots: [],
  films: ["https://swapi.dev/api/films/1/"],
  url: "https://swapi.dev/api/starships/9/",
  created: "2014-12-10T16:36:50.509000Z",
  edited: "2014-12-20T21:26:24.783000Z",
};

function makeStarship(id: number, name: string) {
  return {
    name,
    model: "Custom model",
    manufacturer: "Kuat Drive Yards",
    cost_in_credits: "100000",
    length: "150",
    max_atmosphering_speed: "1000",
    crew: "5",
    passengers: "10",
    cargo_capacity: "100000",
    consumables: "2 months",
    hyperdrive_rating: "2.0",
    MGLT: "60",
    starship_class: "Starfighter",
    pilots: [],
    films: ["https://swapi.dev/api/films/1/"],
    url: `https://swapi.dev/api/starships/${id}/`,
    created: "2014-12-10T16:36:50.509000Z",
    edited: "2014-12-20T21:26:24.783000Z",
  };
}

const starshipsPage1 = [
  deathStar,
  makeStarship(10, "Millennium Falcon"),
  makeStarship(11, "Y-wing"),
  makeStarship(12, "X-wing"),
  makeStarship(13, "TIE Advanced x1"),
  ...Array.from({ length: 5 }, (_, i) => makeStarship(14 + i, `Starship ${14 + i}`)),
];

// ─── Vehicles ─────────────────────────────────────────────────────────────────

function makeVehicle(id: number, name: string) {
  return {
    name,
    model: "Digger Crawler",
    manufacturer: "Corellia Mining Corporation",
    cost_in_credits: "150000",
    length: "36.8",
    max_atmosphering_speed: "30",
    crew: "46",
    passengers: "30",
    cargo_capacity: "50000",
    consumables: "2 months",
    vehicle_class: "wheeled",
    pilots: [],
    films: ["https://swapi.dev/api/films/1/"],
    url: `https://swapi.dev/api/vehicles/${id}/`,
    created: "2014-12-10T15:36:25.724000Z",
    edited: "2014-12-20T21:30:21.661000Z",
  };
}

const vehiclesPage1 = Array.from({ length: 10 }, (_, i) =>
  makeVehicle(i + 1, i === 0 ? "Sand Crawler" : `Vehicle ${i + 1}`)
);

// ─── Route handler builder ────────────────────────────────────────────────────

type ListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Record<string, unknown>[];
};

function listResponse(
  results: Record<string, unknown>[],
  count: number,
  page: number,
  resource: string
): ListResponse {
  const totalPages = Math.ceil(count / 10);
  return {
    count,
    next: page < totalPages ? `https://swapi.dev/api/${resource}/?page=${page + 1}` : null,
    previous: page > 1 ? `https://swapi.dev/api/${resource}/?page=${page - 1}` : null,
    results,
  };
}

function filterByName(items: Record<string, unknown>[], search: string): Record<string, unknown>[] {
  const q = search.toLowerCase();
  return items.filter((item) => {
    const name = ((item.name as string) || (item.title as string) || "").toLowerCase();
    const model = ((item.model as string) || "").toLowerCase();
    return name.includes(q) || model.includes(q);
  });
}

// All people across pages
const allPeople = [...peoplePage1, ...peoplePage2, ...peoplePage3, ...peoplePage4, ...peoplePage5, ...peoplePage6, ...peoplePage7, ...peoplePage8, ...peoplePage9] as Record<string, unknown>[];

const allData: Record<string, { items: Record<string, unknown>[]; count: number; pages: Record<number, Record<string, unknown>[]> }> = {
  people: { items: allPeople, count: 82, pages: { 1: peoplePage1 as any, 2: peoplePage2 as any, 3: peoplePage3 as any, 4: peoplePage4 as any, 5: peoplePage5 as any, 6: peoplePage6 as any, 7: peoplePage7 as any, 8: peoplePage8 as any, 9: peoplePage9 as any } },
  films: { items: allFilms as any, count: 6, pages: { 1: allFilms as any } },
  planets: { items: planetsPage1 as any, count: 60, pages: { 1: planetsPage1 as any } },
  species: { items: speciesPage1 as any, count: 37, pages: { 1: speciesPage1 as any } },
  starships: { items: starshipsPage1 as any, count: 36, pages: { 1: starshipsPage1 as any } },
  vehicles: { items: vehiclesPage1 as any, count: 39, pages: { 1: vehiclesPage1 as any } },
};

// Detail lookup by resource + id
const detailMap: Record<string, Record<string, unknown>> = {};
for (const items of Object.values(allData)) {
  for (const item of items.items) {
    const url = item.url as string;
    detailMap[url] = item;
  }
}

/**
 * Returns a handler function for Playwright's page.route() that intercepts
 * all swapi.dev requests and returns mock data.
 */
export function handleSwapiRoute(url: URL): { status: number; body: string; contentType: string } | null {
  const pathname = url.pathname; // e.g. /api/people/ or /api/people/1/

  // Detail: /api/{resource}/{id}/
  const detailMatch = pathname.match(/^\/api\/(\w+)\/(\d+)\/?$/);
  if (detailMatch) {
    const [, resource, id] = detailMatch;
    const key = `https://swapi.dev/api/${resource}/${id}/`;
    const item = detailMap[key];
    if (item) {
      return { status: 200, body: JSON.stringify(item), contentType: "application/json" };
    }
    return { status: 404, body: JSON.stringify({ detail: "Not found" }), contentType: "application/json" };
  }

  // List: /api/{resource}/
  const listMatch = pathname.match(/^\/api\/(\w+)\/?$/);
  if (listMatch) {
    const resource = listMatch[1];
    const data = allData[resource];
    if (!data) {
      return { status: 404, body: JSON.stringify({ detail: "Not found" }), contentType: "application/json" };
    }

    const page = Number(url.searchParams.get("page")) || 1;
    const search = url.searchParams.get("search") || "";

    if (search) {
      const filtered = filterByName(data.items, search);
      const paged = filtered.slice((page - 1) * 10, page * 10);
      const resp = listResponse(paged, filtered.length, page, resource);
      return { status: 200, body: JSON.stringify(resp), contentType: "application/json" };
    }

    const results = data.pages[page] || [];
    const resp = listResponse(results as Record<string, unknown>[], data.count, page, resource);
    return { status: 200, body: JSON.stringify(resp), contentType: "application/json" };
  }

  return null;
}

export default handleSwapiRoute;
