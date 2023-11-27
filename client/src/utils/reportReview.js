import axios from 'axios';

const reportReview = async (id) => {
  try {
    await axios.put(`/reviews/${id}/report`);
    console.log('Thanks for sending a report!');
  } catch (err) {
    console.error('An error occured when updating this review: ', err);
  }
  return null;
};

export default reportReview;
