import getLocalStorage from './getLocalStorage.js';

const postLocalStorage = (id, newData) => {
  const current = getLocalStorage(id);
  if (current) {
    Object.assign(current, newData);
    localStorage.removeItem(id);
    localStorage.setItem(id, JSON.stringify(current));
  } else {
    localStorage.setItem(id, JSON.stringify(newData));
  }
};

export default postLocalStorage;
