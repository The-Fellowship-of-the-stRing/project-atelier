import axios from 'axios';

const getStyleDataById = async (itemId) => {
  try {
    const response = await axios.get(`/products/${itemId}/styles`);
    return response.data.results;
  } catch (err) {
    console.error(err)
  }
};

export default getStyleDataById;