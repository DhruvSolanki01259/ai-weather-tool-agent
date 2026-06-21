export const WeatherHumanPromptTemplate = (query: string) => {
  return `
    User Query:
    ${query}

    Answer this using ONLY the provided system weather dataset.
  `;
};
