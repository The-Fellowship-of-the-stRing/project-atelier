import fetchCardData from './fetchCardData.js';

const fetchManyCardData = async (ids) => {
  try {
    if (ids) {
      const cardData = await Promise.all(ids.map((id) => fetchCardData(id)));
      return cardData;
    }
  } catch (err) {
    console.error('Error getting item details: ', err);
  }
  return null;
};

export default fetchManyCardData;
