import axios from 'axios';

const getRelatedItems = async (itemId) => {
  try {
    const response = await axios.get(`/products/${itemId}/related`);
    /* Remove main product from related products array */
    const result = [];
    for (let i = 0; i < response.data.length; i += 1) {
      if (response.data[i] !== itemId && result.indexOf(response.data[i]) === -1) {
        result.push(response.data[i]);
      }
    }
    return result;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export default getRelatedItems;
