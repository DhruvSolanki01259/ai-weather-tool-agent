export const DirectHumanPromptTemplate = (query: string): string => {
  const prompt = `
    User Query:
    ${query}
  `;
  return prompt;
};
