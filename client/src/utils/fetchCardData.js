import axios from 'axios';
import getProductDataById from './getProductDataById.js';
import getStyleDataById from './getStyleDataById.js';

const fetchCardData = async (id) => {
  try {
    const productData = await getProductDataById(id);
    const styleData = await getStyleDataById(id);
      let response = {
        id: id,
        name: productData.name || "NO NAME",
        category: productData.category || "NO CAT",
        features: productData.features || []
      };
      for (let i = 0; i < styleData.length; i++) {
        let style = styleData[i];
        if (i === 0 || style["default?"]) {
          response.photos = style.photos[0].thumbnail_url || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
          response.original_price = style.original_price;
          response.sale_price = style.sale_price;
        }
      }
      return response;
  } catch (err) {
    console.error('Error getting item details: ', err);
  }
}

export default fetchCardData;