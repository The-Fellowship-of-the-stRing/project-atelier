import axios from 'axios';

const getReviews = async (itemId, term, count) => {
  try {
    const response = await axios.get(`/reviews/?product_id=${itemId}&sort=${term}&count=${count}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export default getReviews;
