import axios from 'axios';
require('dotenv').config();

// must specify as async -> allows usage of await key
const getReviews = async (itemId, term, count) => {
  try { // try something, if you fail, error will be caught
    const headers = {
      headers: {
        Authorization : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    // await must complete before following lines are executed
    // await keyword must be used for promises
    const response = await axios.get(`${url}/reviews/?product_id=${itemId}&sort=${term}&count=${count}`, headers)
    // once this executes, result will be returned as a promise that has been RESOLVED
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default getReviews;