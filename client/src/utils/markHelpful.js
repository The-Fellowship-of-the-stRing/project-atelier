import axios from 'axios';

const markHelpful = async (id) => {
  try {
    const response = await axios.put(`/reviews/${id}/helpful`);
    console.log('Thanks for letting us know!');
  } catch (err) {
    console.error('An error occured when updating this review: ', err);
  };
};

export default markHelpful;