export const getInfo = async (endpoint, offset) => {
  const characters = await fetch(`${endpoint}&offset=${offset}`);
  const response = await characters.json();
  return response.data.results;
};
