export const movieYearFormat = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
  });
};
