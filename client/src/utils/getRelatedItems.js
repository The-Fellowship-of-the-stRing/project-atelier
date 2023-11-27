import axios from 'axios';

const getRelatedItems = async (itemId) => {
  try {
    const response = await axios.get(`/products/${itemId}/related`);
    /* Remove main product from related products array */
    let filteredResponse = response.data.filter((id) => itemId !== id);
    let uniqueResponse = Array.from(new Set(filteredResponse));
    return uniqueResponse;
  } catch (err) {
    console.error(err);
  }
};

export default getRelatedItems;
