import axios from 'axios';

// must specify as async -> allows usage of await key
const getFirstItem = async () => {
  try { // try something, if you fail, error will be caught
    const headers = {
      headers: {
        "Authorization" : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    // await must complete before following lines are executed
    // await keyword must be used for promises
    const response = await axios.get(`${url}/products`, headers)
    // once this executes, result will be returned as a promise that has been RESOLVED
    return response.data[0];
  } catch (err) {
    console.error(err);
  }
};

export default getFirstItem;