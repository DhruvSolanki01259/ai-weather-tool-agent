type DateStatus = "past" | "present" | "future";

export const getDateStatus = (date?: string): DateStatus => {
  if (!date) return "present";

  const inputDate = new Date(date);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (inputDate.getTime() < today.getTime()) {
    return "past";
  }

  if (inputDate.getTime() > today.getTime()) {
    return "future";
  }

  return "present";
};
