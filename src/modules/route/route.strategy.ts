export const routeStrategy = (query: string): string => {
  let route: string;
  const lowercaseQuery = query.toLowerCase();

  const weatherKeywords = [
    "weather",
    "rain",
    "temperature",
    "forecast",
    "sunny",
    "snow",
    "hot",
    "cold",
    "degree",
  ];
  const isWeatherQuery = weatherKeywords.some((keyword) =>
    lowercaseQuery.includes(keyword),
  );

  if (!isWeatherQuery) {
    route = "direct";
  } else route = "weather";

  return route;
};
