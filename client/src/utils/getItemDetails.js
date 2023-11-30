import axios from 'axios';

const getItemDetails = async (itemId) => {
  try {
    const response = await axios.get(`/reviews/?product_id=${itemId}`);
    let result = 0;
    for (let i = 0; i < response.data.results.length; i += 1) {
      const currentReview = response.data.results[i];
      result += currentReview.rating;
    }
    const divide = response.data.results.length < 1 ? 1 : response.data.results.length;
    const rating = result / divide;
    return rating;
  } catch (err) {
    console.error('An error occured while getting product ratings info: ', err);
  }
  return null;
};

export default getItemDetails;
