export const updateUser = (name, email, password) => {
  const previousLocalStorage = JSON.parse(localStorage.getItem('user'));
  const newLocalStorage = { ...previousLocalStorage, 'name': name, 'email': email, 'password': password };
  localStorage.setItem('user', JSON.stringify(newLocalStorage));
};

export const getUser = () => {
  const previousUser = JSON.parse(localStorage.getItem('user'));
  return previousUser;
};

export const setUser = (name, email, password) => {
  const previousUser = localStorage.setItem('user', JSON.stringify({ name: name, email: email, password: password }));
  return previousUser;
};

export const setUserLogin = (token, name, email, id, password) => {
  const previousUser = localStorage.setItem('user', JSON.stringify({ token: token, name: name, email: email, id: id, password: password }));
  return previousUser;
};

export const verifyUser = (history) => {
  const storage = JSON.parse(localStorage.getItem('user'));
  if (!storage) {
    history.push('/');
    return { email: null, name: null, password: null, id: null, token: null };
  }
  const { name, email, password, id, token } = storage;
  return { name, email, password, id, token };
};