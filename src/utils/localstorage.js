export const updateUser = (name, email, password) => {
  const previousLocalStorage = JSON.parse(localStorage.getItem('user'));
  const newLocalStorage = { ...previousLocalStorage, 'name': name, 'email': email, 'password': password };
  localStorage.setItem('user', JSON.stringify(newLocalStorage));
};

export const registerLS = (name, email, password) => {
  localStorage.setItem('user', JSON.stringify({ 'name': name, 'email': email, 'password': password }));
};

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

export const verifyUser = (history) => {
  const storage = JSON.parse(localStorage.getItem('user'));
  if (!storage) {
    history.push('/login');
    return { email: null, name: null, password: null };
  }
  const { name, email, password } = storage;
  return { name, email, password };
};

export const setUserLogin = (token, name, email, id) => {
  const previousUser = localStorage.setItem('user', JSON.stringify({ token: token, name: name, email: email, id: id }));
  return previousUser;
};