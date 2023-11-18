import axios from 'axios';

const getRelatedItems = async (itemId) => {
  try {
    const headers = {
      headers: {
        "Authorization" : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    const response = await axios.get(`${url}/products/${itemId}/related`, headers);

    return response.data
  } catch (err) {
    console.error(err)
  }
};

export default getRelatedItems;