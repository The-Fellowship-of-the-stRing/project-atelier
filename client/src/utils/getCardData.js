import axios from 'axios';

const getCardData = async (itemId) => {
  try {
    const headers = {
      headers: {
        "Authorization" : process.env.GIT_TOKEN
      }
    };
    const url = process.env.GIT_API_URL;
    let response = {}
    const idResponse = await axios.get(`${url}/products/${itemId}`, headers);
    response.category = idResponse.data.category;
    response.features = idResponse.data.features;

    const stylesResponse = await axios.get(`${url}/products/${itemId}/styles`, headers);

    /* FIND DEFAULT STYLE */
    let defaultStyle;
    for (let style of stylesResponse.data.results) {
      if(style["default?"]) {
        defaultStyle = style;
      }
    }
    response.name = defaultStyle.name;
    response.photos = defaultStyle.photos;
    response.original_price = defaultStyle.original_price;

    return response;
  } catch (err) {
    console.error(err)
  }
};

export default getCardData;