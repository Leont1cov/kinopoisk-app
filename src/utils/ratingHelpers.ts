export const getRatingColor = (rating: number | null) => {
  if (!rating) return "#9e9e9e";
  if (rating > 7) return "#4caf50";
  if (rating > 5) return "#ff9800";
  return "#f44336";
};
