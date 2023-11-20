import axios from 'axios';

const getProductDataById = async (itemId) => {
  try {
    const response = await axios.get(`/products/${itemId}`);
    return response;
  } catch (err) {
    console.error(err)
  }
};

export default getProductDataById;