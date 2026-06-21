import { NextResponse } from "next/server";
import { weatherAPICall } from "./weather.api.call";
import { getWeatherDetails } from "./weather.details";

export const weatherAPIFlow = async (query: string) => {
  const weatherDetails = getWeatherDetails(query);

  // MUST return:
  // { cities: ["Mumbai", "Delhi", "Bangalore"], date, next_days_from_curr }

  const results: Record<string, any> = {};

  for (const city of weatherDetails.city ?? []) {
    const data = await weatherAPICall({
      city,
      date: weatherDetails.date,
      next_days_from_curr: weatherDetails.next_days_from_curr,
    });

    results[city] = data;
  }
  return results;
};
