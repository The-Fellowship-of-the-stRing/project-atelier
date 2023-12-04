import axios from 'axios';
import getLocalStorage from './getLocalStorage.js';
import postLocalStorage from './postLocalStorage.js';

const getRelatedItems = async (id) => {
  try {
    const current = getLocalStorage(id);
    if (current.related) {
      return current.related;
    }
    const response = await axios.get(`/products/${id}/related`);
    const result = [];
    for (let i = 0; i < response.data.length; i += 1) {
      if (response.data[i] !== id && result.indexOf(response.data[i]) === -1) {
        result.push(response.data[i]);
      }
    }
    postLocalStorage(id, { related: result });
    console.log(getLocalStorage(id));
    return result;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export default getRelatedItems;
