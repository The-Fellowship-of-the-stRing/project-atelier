import axios from 'axios';

const getItemDetails = async (itemId) => {
  try {
    const headers = {
      headers: {
        "Authorization" : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    const response = await axios.get(`${url}/reviews/?product_id=${itemId}`, headers)
    let result = 0;
    for (let i = 0; i < response.data.results.length; i++) {
      const currentReview = response.data.results[i]
      result = result + currentReview.rating;
    }
    const rating = await result / response.data.results.length
    return rating;
  } catch (err) {
    console.error('An error occured while getting product ratings info: ', err);
  }
}

export default getItemDetails;