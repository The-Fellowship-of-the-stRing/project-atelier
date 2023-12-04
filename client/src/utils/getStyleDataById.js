import axios from 'axios';
import getLocalStorage from './getLocalStorage.js';
import postLocalStorage from './postLocalStorage.js';

const getStyleDataById = async (id) => {
  try {
    const current = getLocalStorage(id);
    if (current.styles) {
      return current.styles;
    }
    const response = await axios.get(`/products/${id}/styles`);
    postLocalStorage(id, { styles: response.data.results });
    return response.data.results;
  } catch (err) {
    return console.error(err);
  }
};

export default getStyleDataById;
