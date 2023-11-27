import axios from 'axios';

const markHelpful = async (id) => {
  try {
    await axios.put(`/reviews/${id}/helpful`);
    console.log('Thanks for letting us know!');
  } catch (err) {
    console.error('An error occured when updating this review: ', err);
  }
  return null;
};

export default markHelpful;
