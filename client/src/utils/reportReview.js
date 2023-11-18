import axios from 'axios';
require('dotenv').config();

const reportReview = async (id) => {
  try {
    const headers = {
      headers: {
        Authorization : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    const response = await axios.put(`${url}/reviews/${id}/report`, null, headers);
    console.log('Thanks for sending a report!');
  } catch (err) {
    console.error('An error occured when updating this review: ', err);
  };
};

export default reportReview;