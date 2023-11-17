import axios from 'axios';

const getFirstItem = async () => {
  try {
    const headers = {
      headers: {
        "Authorization" : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    const response = await axios.get(`${url}/products`, headers)
    return response.data[3]
  } catch (err) {
    console.log(console.error(err))
  }
};

export default getFirstItem;