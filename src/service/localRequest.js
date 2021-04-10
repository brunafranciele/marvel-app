export const getCharacterByName = async (name) => {
  const character = await fetch(`http://localhost:3001/character/name/${name}`);
  const response = await character.json();
  return response;
};

export const getComicByTitle = async (title) => {
  const comic = await fetch(`http://localhost:3001/comic/title/${title}`);
  const response = await comic.json();
  return response;
};

export const getCharacterById = async (id) => {
  const character = await fetch(`http://localhost:3001/character/${id}`);
  const response = await character.json();
  return response;
};

export const getComicById = async (id) => {
  const comic = await fetch(`http://localhost:3001/comic/${id}`);
  const response = await comic.json();
  return response;
};