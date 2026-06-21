export const getWeatherData = async (city: string) => {
  const response = await fetch(
    `${process.env.WEATHER_API_BASE_URL}/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=yes`,
  );

  const data = await response.json();
  const returnData = {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,
    localtime: data.location.localtime,
    temp_c: data.current.temp_c,
    temp_f: data.current.temp_f,
    is_day: data.current.is_day,
    text: data.current.condition.text,
  };
  return returnData;
};
