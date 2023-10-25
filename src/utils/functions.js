export const formatDateFromTimestamp = (timestamp) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", options);
};
