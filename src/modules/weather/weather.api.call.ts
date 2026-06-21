import { getDateStatus } from "@/utils/getDateStatus";

interface WeatherDataObj {
  city: string;
  date?: string;
  next_days_from_curr?: number;
}

export const weatherAPICall = async (weatherData: WeatherDataObj) => {
  const BASE_URL = process.env.WEATHER_API_BASE_URL!;
  const API_KEY = process.env.WEATHER_API_KEY!;

  const { city, date, next_days_from_curr } = weatherData;

  const dateStatus = getDateStatus(date);

  let endpoint = "";
  let extraParams = "";

  if (dateStatus === "present") {
    endpoint = "/current.json";
  } else if (dateStatus === "past") {
    endpoint = "/history.json";
    extraParams = date ? `&dt=${date}` : "";
  } else {
    endpoint = "/forecast.json";
    extraParams = `&days=${next_days_from_curr ?? 1}`;
  }

  const url =
    `${BASE_URL}${endpoint}` +
    `?key=${API_KEY}&q=${encodeURIComponent(city)}` +
    extraParams;

  const response = await fetch(url);
  const data = await response.json();

  return {
    dateStatus,
    city: data.location?.name,
    region: data.location?.region,
    country: data.location?.country,
    localtime: data.location?.localtime,

    ...(dateStatus === "present" && {
      temp_c: data.current?.temp_c,
      temp_f: data.current?.temp_f,
      condition: data.current?.condition?.text,
      is_day: data.current?.is_day,
    }),

    ...(dateStatus === "future" && {
      forecast: data.forecast?.forecastday?.map((day: any) => ({
        date: day.date,
        condition: day.day?.condition?.text,
      })),
    }),

    ...(dateStatus === "past" && {
      history: data.forecast?.forecastday?.map((day: any) => ({
        date: day.date,
        condition: day.day?.condition?.text,
      })),
    }),
  };
};
