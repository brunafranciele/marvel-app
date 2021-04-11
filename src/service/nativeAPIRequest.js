const baseURL = 'http://localhost:3001/'
const applicationJsonContent = 'application/json';
export const getCharacterByName = async (name) => {
  const character = await fetch(`${baseURL}character/name/${name}`);
  const response = await character.json();
  return response;
};
export const getComicByTitle = async (title) => {
  const comic = await fetch(`${baseURL}comic/title/${title}`);
  const response = await comic.json();
  return response;
};
export const getCharacterById = async (id) => {
  const character = await fetch(`${baseURL}character/${id}`);
  const response = await character.json();
  return response;
};
export const getComicById = async (id) => {
  const comic = await fetch(`${baseURL}comic/${id}`);
  const response = await comic.json();
  return response;
};
export const getFavoriteByUserId = async (id) => {
  const favorite = await fetch(`${baseURL}favorite/${id}`);
  console.log(favorite, 'nativeAPI')
  const response = await favorite.json();
  return response;
};

export const registerUser = async (name, email, password) => {
  const newUser = await fetch(`${baseURL}user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': applicationJsonContent,
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return newUser;
};
export const loginUser = (email, password) => fetch(`${baseURL}user/login`, {
  method: 'POST',
  headers: {
    'Content-type': applicationJsonContent,
  },
  body: JSON.stringify({ email, password }),
})
  .then((response) => response.json())
  .catch((error) => console.log(error));
  
export const updateUserAPI = (name, email, password, id, token) => fetch(`${baseURL}user/update`, {
  method: 'PUT',
  headers: {
    'Content-type': applicationJsonContent,
    authorization: token,
  },
  body: JSON.stringify({ name, email, password, id }),
}).then((response) => response);

export const addFavorite = (id_favorite, name, url_image, related, user_id) => fetch(`${baseURL}favorite`, {
  method: 'POST',
  headers: {
    'Content-type': applicationJsonContent,
  },
  body: JSON.stringify({ id_favorite, name, url_image, related, user_id }),
})
  .then((response) => response.json())
  .catch((error) => console.log(error));

  export const deleteFavorite = (id) => fetch(`${baseURL}favorite/delete`, {
    method: 'DELETE',
    headers: {
      'Content-type': applicationJsonContent,
    },
    body: JSON.stringify({ id }),
  }).then((response) => response);