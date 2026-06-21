export const WeatherAPICalls = {
  current: {
    endpoint: "/current.json",
    params: {
      key: "API_KEY",
      q: "Mumbai",
      aqi: "yes",
    },
  },

  forecast: {
    endpoint: "/forecast.json",
    params: {
      key: "API_KEY",
      q: "Mumbai",
      days: 3,
      aqi: "yes",
      alerts: "yes",
    },
  },

  history: {
    endpoint: "/history.json",
    params: {
      key: "API_KEY",
      q: "Mumbai",
      dt: "2026-06-20",
    },
  },
};
