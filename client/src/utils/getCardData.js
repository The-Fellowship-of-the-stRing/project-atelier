import axios from 'axios';

const getCardData = async (itemId) => {
  try {
    const headers = {
      headers: {
        "Authorization" : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    let response;

    const idResponse = await axios.get(`${url}/products/${itemId}`, headers);
    response = {
        name: idResponse.data.name,
        category:idResponse.data.category,
        features:idResponse.data.features
    };

    const stylesResponse = await axios.get(`${url}/products/${itemId}/styles`, headers);
    /* FIND DEFAULT STYLE */
    for (let style of stylesResponse.data.results) {
      if(style["default?"]) {
        response.photos = style.photos;
        response.original_price = style.original_price;
        response.sale_price = style.sale_price;
      }
    }

    return response;
  } catch (err) {
    console.error(err)
  }
};

export default getCardData;