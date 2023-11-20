import axios from 'axios';

const getRelatedItems = async (itemId) => {
  try {
    const response = await axios.get(`/products/${itemId}/related`);
    return response.data
  } catch (err) {
    console.error(err)
  }
};

export default getRelatedItems;