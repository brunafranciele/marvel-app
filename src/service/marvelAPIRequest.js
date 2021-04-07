export const getData = async (endopoint) => {
  const data = await fetch(endopoint);
  const response = await data.results;
  return response
};