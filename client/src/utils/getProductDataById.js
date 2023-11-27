import axios from 'axios';

const getProductDataById = async (itemId) => {
  try {
    const response = await axios.get(`/products/${itemId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export default getProductDataById;
