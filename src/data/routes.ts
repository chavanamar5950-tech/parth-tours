import data from "./routes.json";
import { business } from "@/config/business";

export type RouteKind = "intercity" | "outstation" | "local" | "darshan";

export interface RouteItem {
  slug: string;
  title: string;
  from: string;
  to: string;
  kind: RouteKind;
  tags: string[];
  popular: boolean;
  image: string | null;
  blurb: string;
  about: string;
}

export const routes = data as unknown as RouteItem[];

export const routeBySlug = (slug: string) => routes.find((r) => r.slug === slug);

export const popularRoutes = routes.filter((r) => r.popular);
export const localRoutes = routes.filter((r) => r.kind === "local");
export const darshanRoutes = routes.filter((r) => r.kind === "darshan");
export const coastalFeatured = ["kolhapur-to-ratnagiri", "kolhapur-to-malvan-and-sindhudurg", "kolhapur-to-goa", "goa-to-kolhapur", "kolhapur-to-kokan-darshan"]
  .map((s) => routeBySlug(s))
  .filter(Boolean) as RouteItem[];

export const FILTERS = [
  { id: "all", label: "All routes" },
  { id: "from-kolhapur", label: "From Kolhapur" },
  { id: "to-kolhapur", label: "To Kolhapur" },
  { id: "maharashtra", label: "Maharashtra" },
  { id: "goa", label: "Goa" },
  { id: "karnataka", label: "Belgaum & Karnataka" },
  { id: "coastal", label: "Coastal" },
] as const;

export const originCities = Array.from(new Set(routes.filter((r) => r.kind === "intercity" || r.kind === "outstation").map((r) => r.from))).sort((a, b) =>
  a === business.city ? -1 : b === business.city ? 1 : a.localeCompare(b)
);

export const destinationsFor = (from: string) =>
  Array.from(new Set(routes.filter((r) => (r.kind === "intercity" || r.kind === "outstation") && (!from || r.from === from)).map((r) => r.to)));

export const allPlaces = Array.from(new Set(routes.filter((r) => r.kind === "intercity").flatMap((r) => [r.from, r.to])));

/** Related routes for a route page: same origin or same destination, never itself. */
export function relatedRoutes(slug: string, limit = 6): RouteItem[] {
  const r = routeBySlug(slug);
  if (!r) return [];
  return routes
    .filter((x) => x.slug !== slug && x.kind !== "local" && (x.from === r.from || x.to === r.to || x.from === r.to || x.to === r.from))
    .slice(0, limit);
}
