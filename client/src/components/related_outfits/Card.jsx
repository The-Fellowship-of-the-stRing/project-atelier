import React,{useState, useEffect} from 'react';
import getProductDataById from '../../utils/getProductDataById.js';
import getStyleDataById from '../../utils/getStyleDataById.js';
import Stars from './Stars.jsx';

const Card = ( {itemId, className, action, addProduct, deleteProduct, itemFeatures, updateMainProduct} ) => {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const productData = await getProductDataById(itemId);
        const styleData = await getStyleDataById(itemId);
        if(productData&&styleData) {
          let response = {
            name: productData.name || "NO NAME",
            category: productData.category || "NO CAT",
            features: productData.features || []
          };
          /* FIND DEFAULT STYLE */
          for (let i = 0; i < styleData.length; i++) {
            let style = styleData[i];
            if (i === 0 || style["default?"]) {
              response.photos = style.photos[0].thumbnail_url || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
              response.original_price = style.original_price; // Handling price transformation below
              response.sale_price = style.sale_price;
            }
          }
          return setCardData(response);
        }

        return setCardData(response);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchCardData();
  }, []);

  let priceString =
    (cardData && cardData.sale_price && cardData.original_price) ? (<p className="c-card-price"><s className="c-card-price-sales">${cardData.sale_price}</s> ${cardData.original_price}</p>)
    : (cardData && cardData.original_price) ? (<p className="c-card-price">${cardData.original_price} </p>)
    : (<p className="c-card-price">NO PRICE :(</p>);

  const relatedActionClickHander = () => {
    console.log('RELATED -> COMPARE MODULE');
  }

  let actionButtons = {
    related: (<p className="c-card-action-related" onClick={() => relatedActionClickHander()}>⭐</p>),
    outfits: (<p className="c-card-action-outfits" onClick={() => deleteProduct(itemId)}>☒</p>)
  }

  return cardData ? (
    <div className={className} >
      {actionButtons[action]}
      <img className="c-card-img" onClick={() => updateMainProduct(itemId)}
        src={cardData.photos} />
      {/* <img className="c-card-img" onClick={() => updateMainProduct(itemId)}
        src={cardData.hasOwnProperty("photos") && cardData.photos[0].thumbnail_url !== null
        ? cardData.photos[0].thumbnail_url
        : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"} /> */}
      <div className="c-card-text-container">
        <div className="c-card-cat">{cardData.category}</div>
        <div className="c-card-name" onClick={() => updateMainProduct(itemId)}>{cardData.name}</div>
        <div className="c-card-price">{priceString}</div>
        <Stars itemId={itemId} />
      </div>
    </div>
  ) : (
  <div className="c-card-container"></div>
  );
}
export default Card