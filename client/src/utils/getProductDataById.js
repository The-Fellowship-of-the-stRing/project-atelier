import axios from 'axios';
import getLocalStorage from './getLocalStorage.js';
import postLocalStorage from './postLocalStorage.js';

const getProductDataById = async (id) => {
  try {
    const current = getLocalStorage(id);
    if (current && current.name) {
      return current;
    }
    const response = await axios.get(`/products/${id}`);
    postLocalStorage(id, response.data);
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

export default getProductDataById;
