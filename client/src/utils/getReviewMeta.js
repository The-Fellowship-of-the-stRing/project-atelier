import axios from 'axios';
require('dotenv').config();

const getReviewMeta = async (id) => {
  try {
    const headers = {
      headers: {
        Authorization : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    const response = await axios.get(`${url}/reviews/meta/?product_id=${id}`, headers)
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default getReviewMeta;