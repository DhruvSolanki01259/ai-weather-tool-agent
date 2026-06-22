type DirectOutput = {
  title: string;
  description: string;
  explanation: string;
  examples: {
    input: string;
    output: string;
    note?: string;
  }[];
  summary: string;
};

export const convertDirectResponseToJson = (response: string): DirectOutput => {
  const cleanedResponse = response
    .replace(/`[\s\S]*?\n/g, "")
    .replace(/`/g, "")
    .replace(/~~~/g, "")
    .trim();

  const invalidValue = (value: string): boolean => {
    const cleaned = value.trim();

    return [
      /^title$/i,
      /^\(title\)$/i,
      /^\[title\]$/i,

      /^description$/i,
      /^\(description\)$/i,
      /^\[description\]$/i,

      /^summary$/i,
      /^\(summary\)$/i,
      /^\[summary\]$/i,

      /^explanation$/i,
      /^\(explanation\)$/i,
      /^\[explanation\]$/i,

      /^example$/i,
      /^\(example\)$/i,
      /^\[example\]$/i,

      /^insert.*$/i,
      /^placeholder.*$/i,
      /^example.*here$/i,
    ].some((pattern) => pattern.test(cleaned));
  };

  const clean = (value?: string): string => {
    if (!value) return "";

    const cleaned = value.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();

    return invalidValue(cleaned) ? "" : cleaned;
  };

  const extractSection = (field: string, nextFields: string[]): string => {
    const nextPattern = nextFields.join("|");

    const regex = new RegExp(
      `${field}:\\s*([\\s\\S]*?)(?=\\n\\s*(?:${nextPattern}):|$)`,
      "i",
    );

    return clean(cleanedResponse.match(regex)?.[1]);
  };

  const title = extractSection("title", [
    "description",
    "explanation",
    "examples",
    "summary",
  ]);

  const description = extractSection("description", [
    "explanation",
    "examples",
    "summary",
  ]);

  const explanation = extractSection("explanation", ["examples", "summary"]);

  const summary = extractSection("summary", []);

  const examplesBlock = extractSection("examples", ["summary"]);

  const examples = examplesBlock
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.startsWith("-") || x.startsWith("*"))
    .map((x, index) => ({
      input: `Example ${index + 1}`,
      output: clean(x.replace(/^[-*]\s*/, "")),
    }))
    .filter((x) => x.output.length > 0);

  return {
    title,
    description,
    explanation,
    examples,
    summary,
  };
};

type WeatherOutput = {
  explaination: string;
  summary: string;
};

export const convertWeatherResponseToJson = (
  response: string,
): WeatherOutput => {
  const cleanResponse = response
    .replace(/```[\s\S]*?\n/g, "")
    .replace(/```/g, "")
    .replace(/~~~/g, "")
    .trim();

  const clean = (value: string): string => {
    return value.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  };

  const extractSection = (key: string): string => {
    const regex = new RegExp(
      `${key}\\s*:?\\s*([\\s\\S]*?)(?=\\n\\s*[A-Z ]+\\s*:|$)`,
      "i",
    );

    return clean(cleanResponse.match(regex)?.[1] || "");
  };

  const explaination =
    clean(extractSection("explanation")) ||
    clean(extractSection("explaination"));

  const summary =
    clean(extractSection("summary")) ||
    cleanResponse
      .split("\n")
      .find((line) => line.toLowerCase().includes("summary"))
      ?.replace(/summary/i, "")
      ?.replace(/:/g, "")
      ?.trim() ||
    "";

  return {
    explaination,
    summary,
  };
};
