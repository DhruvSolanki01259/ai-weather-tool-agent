import { City } from "country-state-city";

const MONTHS = new Set([
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  "jan",
  "feb",
  "mar",
  "apr",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]);

// Common aliases
const CITY_ALIASES: Record<string, string> = {
  bangalore: "Bengaluru",
  bombay: "Mumbai",
  calcutta: "Kolkata",
  madras: "Chennai",
};

const cityLookup = new Map<string, string>();

// Build city map
City.getAllCities().forEach((city) => {
  cityLookup.set(city.name.toLowerCase(), city.name);
});

// Add aliases
Object.entries(CITY_ALIASES).forEach(([alias, actual]) => {
  cityLookup.set(alias, actual);
});

export function extractCities(query: string): string[] {
  const cities = new Set<string>();

  const normalized = query.toLowerCase().replace(/[^\w\s]/g, " ");

  const words = normalized.split(/\s+/);

  // Check single words and multi-word city names
  for (let i = 0; i < words.length; i++) {
    for (let len = 3; len >= 1; len--) {
      const candidate = words.slice(i, i + len).join(" ");

      if (MONTHS.has(candidate)) continue;

      const city = cityLookup.get(candidate);

      if (city) {
        cities.add(city);
      }
    }
  }

  return [...cities];
}
