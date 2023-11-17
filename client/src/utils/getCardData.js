import axios from 'axios';
// import getItemDetails from './getItemDetails.jsx';

const getCardData = async (itemId) => {
  try {
    const headers = {
      headers: {
        "Authorization" : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    let response = {}
    console.log("id", itemId);
    const idResponse = await axios.get(`${url}/products/${itemId}`, headers);
    console.log("1. Product Data", idResponse.data)
    response.category = idResponse.data.category;
    response.features = idResponse.data.features;

    const stylesResponse = await axios.get(`${url}/products/${itemId}/styles`, headers);
    console.log('Styles Res Pre: ', stylesResponse);
    for (let key in stylesResponse.data) {
      if(stylesResponse.data[key].default) {
        stylesResponse.data = stylesResponse.data[key];
      }
    }
    console.log('Styles Res Post: ', stylesResponse);
    response.name = stylesResponse.data.name;
    response.features = stylesResponse.data.features;
    response.photos = stylesResponse.data.photos;
    response.original_price = stylesResponse.data.original_price;

    console.log('Final response: ', response.data);
    return response.data;
  } catch (err) {
    console.error(err)
  }
};

export default getCardData;