interface DataObj {
  city: string;
  date: string;
  next_days_from_curr: number;
}

export const getWeatherDetails = (query: string) => {
  const requiredData: DataObj = {
    city: "",
    date: "",
    next_days_from_curr: 0,
  };

  // Forecast -> Furture
  // const ForecastURL = `https://api.weatherapi.com/v1${WeatherAPICalls.forecast.endpoint}?key=${API_KEY}&q=${city}&days=${futureDays}`;

  // Current --> Present
  // const CurrentURL = `https://api.weatherapi.com/v1${WeatherAPICalls.current.endpoint}?key=${API_KEY}&q=${city}`;

  // History --> Past
  // const HistoryURL = `https://api.weatherapi.com/v1${WeatherAPICalls.history.endpoint}?key=${API_KEY}&q=${city}&dt=${date}`;

  // Month Extraction from the Query

  // Date Extraction from the Query

  return requiredData;
};
