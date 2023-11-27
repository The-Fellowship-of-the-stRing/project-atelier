import axios from 'axios';

const addReview = async (body) => {
  try {
    await axios.post('/reviews', body);
    console.log('Thanks for your review!');
  } catch (err) {
    console.error(err);
  }
};

export default addReview;
