import axios from 'axios';

const getFirstItem = async () => {
  try {
    const endpoint = 'products';
    const response = await axios.get(`/${endpoint}`);
    return response.data[0];
  } catch (err) {
    console.error(err);
  }
  return null;
};

export default getFirstItem;
