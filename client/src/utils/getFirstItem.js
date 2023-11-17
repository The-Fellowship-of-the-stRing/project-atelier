import axios from 'axios';
require('dotenv').config();

const getFirstItem = async () => {
  try {
    const headers = {
      headers: {
        Authorization : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    const response = await axios.get(`${url}/products`, headers)
    return response.data[0]
  } catch (err) {
    console.log(console.error(err))
  }
};

export default getFirstItem;