import axios from 'axios';

const getReviewMeta = async (id) => {
  try {
    const response = await axios.get(`/reviews/meta/?product_id=${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default getReviewMeta;
