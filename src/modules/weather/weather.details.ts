import { extractCities } from "@/utils/extractCitites";
import { extractDate } from "@/utils/extractDate";

interface DataObj {
  city: string[];
  date?: string; // string | undefined
  next_days_from_curr: number;
}

export const getWeatherDetails = (query: string): DataObj => {
  const cities = extractCities(query);
  const date = extractDate(query) || undefined;

  let next_days_from_curr = 0;

  if (date) {
    const today = new Date();
    const targetDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffInMs = targetDate.getTime() - today.getTime();

    next_days_from_curr = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  return {
    city: cities,
    date,
    next_days_from_curr,
  };
};
