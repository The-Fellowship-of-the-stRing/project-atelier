import axios from 'axios';

const getRelatedItems = async (itemId) => {
  try {
    const response = await axios.get(`/products/${itemId}/related`);
    /* Remove main product from related products array */
    const filteredResponse = response.data.filter((id) => itemId !== id);
    const uniqueResponse = Array.from(new Set(filteredResponse));
    return uniqueResponse;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export default getRelatedItems;
