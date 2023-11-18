import React,{useState, useEffect} from 'react';
// import getItemDetails from '../../utils/getItemDetails.js';
import getCardData from '../../utils/getCardData.js';

const Card = ( {itemId, className} ) => {
  const [cardData, setCardData] = useState(null);
  // console.log(itemId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCardData(itemId);

        /* TESTING */
        data.sale_price = 10;
        /* TESTING */

        return setCardData(data);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchData();
  }, []);


  let priceString;
  if(cardData && cardData.hasOwnProperty('sale_price')) {
    priceString = (<p className="c-card-price"><s className="c-card-price-sales">${cardData.sale_price}</s> ${cardData.original_price}</p>);
  } else if ( cardData && cardData.hasOwnProperty('original_price')) {
    priceString = (<p className="c-card-price">${cardData.original_price}</p>);
  }
  /* REFACTOR ABOVE LATER: */
  // let priceString = (cardData && cardData.hasOwnProperty('sale_price')) ? (<p className="c-card-price"><s className="c-card-price-sales">${cardData.sale_price}</s> ${cardData.original_price}</p>) : (<p className="c-card-price">${cardData.original_price}</p>);

  return cardData ? (
    <div className={className}>
      <img className="c-card-img" src={cardData.photos ? cardData.photos[0].thumbnail_url : ""} />
      <p className="c-card-cat">{cardData.category}</p>
      <p className="c-card-name">{cardData.name}</p>
      {priceString}
      <p className="c-card-star">STAR RATING</p>
    </div>
  ) : (
  <div className="c-card-container">
    No Data
  </div>
  );
}
export default Card