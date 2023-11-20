import axios from 'axios';
require('dotenv').config();

// must specify as async -> allows usage of await key
const addReview = async (body) => {
  try { // try something, if you fail, error will be caught
    const headers = {
      headers: {
        Authorization : process.env.GIT_TOKEN,
        "Content-Type": "application/json"
      }
    };
    const url = process.env.GIT_API_URL;
    // await must complete before following lines are executed
    // await keyword must be used for promises
    const response = await axios.post(`${url}/reviews`, body, headers)
    // once this executes, result will be returned as a promise that has been RESOLVED
  } catch (err) {
    console.error(err);
  }
};

export default addReview;