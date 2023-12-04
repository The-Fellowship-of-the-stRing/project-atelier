import getProductDataById from './getProductDataById.js';
import getStyleDataById from './getStyleDataById.js';

const fetchCardData = async (id) => {
  try {
    await getStyleDataById(id);
    const productData = await getProductDataById(id);
    if (productData) {
      const response = {
        id,
        name: productData.name || 'NO NAME',
        category: productData.category || 'NO CAT',
        features: productData.features || [],
      };
      for (let i = 0; i < productData.styles.length; i += 1) {
        const style = productData.styles[i];
        if (i === 0 || style['default?']) {
          let thumbnailImage = style.photos[0].thumbnail_url || 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg';
          thumbnailImage = thumbnailImage.slice(thumbnailImage.indexOf('https:'));
          response.photos = thumbnailImage;
          response.prePhotos = style.photos.slice(1);
          response.original_price = style.original_price;
          response.sale_price = style.sale_price;
        }
      }
      return response;
    }
  } catch (err) {
    console.error('Error getting item details: ', err);
  }
  return null;
};

export default fetchCardData;
