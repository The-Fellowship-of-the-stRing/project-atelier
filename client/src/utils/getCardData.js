import axios from 'axios';

const getCardData = async (itemId) => {
  try {
    let response;
    const idResponse = await axios.get(`/products/${itemId}`);
    response = {
        name: idResponse.data.name,
        category:idResponse.data.category,
        features:idResponse.data.features
    };

    const stylesResponse = await axios.get(`/products/${itemId}/styles`);

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