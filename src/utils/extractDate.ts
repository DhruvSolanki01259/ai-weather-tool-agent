import * as chrono from "chrono-node";

export const extractDate = (query: string) => {
  const dateRegex =
    /\b((?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4})|(?:\d{4}[/-]\d{1,2}[/-]\d{1,2})|(?:\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)(?:\s+\d{2,4})?)|(?:(?:Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)\s+\d{1,2}(?:st|nd|rd|th)?(?:,\s*\d{2,4})?)|(?:today|tomorrow|yesterday|next\s+\w+|this\s+\w+|last\s+\w+))\b/i;

  const match = query.match(dateRegex);

  if (!match) return null;

  const parsedDate = chrono.parseDate(match[0]);

  if (!parsedDate) return null;

  return parsedDate.toISOString().split("T")[0];
};
