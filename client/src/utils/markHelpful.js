import axios from 'axios';
require('dotenv').config();

const markHelpful = async (id) => {
  try {
    const headers = {
      headers: {
        Authorization : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    const response = await axios.put(`${url}/reviews/${id}/helpful`, null, headers);
    console.log('Thanks for letting us know!');
  } catch (err) {
    console.error('An error occured when updating this review: ', err);
  };
};

export default markHelpful;