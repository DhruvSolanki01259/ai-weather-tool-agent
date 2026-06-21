interface DataObt {
  name?: string;
  region?: string;
  country?: string;
  localtime?: Date;
  temp_c?: number;
  temp_f?: number;
  is_day?: number;
  text?: string;
}

export const WeatherHumanPromptTemplate = (weatherData: DataObt = {}) => {
  const { name, region, country, localtime, temp_c, temp_f, is_day, text } =
    weatherData;
  const prompt = `
    Analyze this weather data and generate a user-friendly weather update.

    Weather Data:
    Location: ${name}
    Region: ${region}
    Country: ${country}
    Local Time: ${localtime}
    Temperature (C): ${temp_c}
    Temperature (F): ${temp_f}
    Daytime: ${is_day ? "Yes" : "No"}
    Condition: ${text}
  `;

  return prompt;
};
