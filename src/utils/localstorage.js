export const updateName = (name, email, password) => {
  const previousLocalStorage = JSON.parse(localStorage.getItem('user'));
  const newLocalStorage = { ...previousLocalStorage, name };
  localStorage.setItem('user', JSON.stringify({ ...newLocalStorage, 'email': email, 'password': password}));
};