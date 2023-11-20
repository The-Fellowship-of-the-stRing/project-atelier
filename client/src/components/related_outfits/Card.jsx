import React,{useState, useEffect} from 'react';
import getCardData from '../../utils/getCardData.js';
import Stars from './Stars.jsx';

const Card = ( {itemId, className, action} ) => {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCardData(itemId);
        /* TESTING */
        data.sale_price = 10;
        return setCardData(data);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchData();
  }, []);

/*   try {
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
    } */

  let priceString;
  if(cardData && cardData.hasOwnProperty('sale_price')) {
    priceString = (<p className="c-card-price"><s className="c-card-price-sales">${cardData.sale_price}</s> ${cardData.original_price}</p>);
  } else if ( cardData && cardData.hasOwnProperty('original_price')) {
    priceString = (<p className="c-card-price">${cardData.original_price}</p>);
  }
  /* REFACTOR ABOVE LATER: */
  // let priceString = (cardData && cardData.hasOwnProperty('sale_price')) ? (<p className="c-card-price"><s className="c-card-price-sales">${cardData.sale_price}</s> ${cardData.original_price}</p>) : (<p className="c-card-price">${cardData.original_price}</p>);
  // console.log(cardData);

  const cardClickHandler = () => {
    /* GET FROM GORDON */
    // Click on image and product title
    console.log('Will route to product details page id: ', itemId);
  }

  const relatedActionClickHander = () => {
    console.log('RELATED -> COMPARE MODULE');
  }

  const outfitsActionClickHander = () => {
    console.log('TO REMOVE FROM OUTFITS');
  }


  let actionButtons = {
    related: (<p className="c-card-action-related" onClick={() => relatedActionClickHander()}>⭐</p>),
    outfits: (<p className="c-card-action-outfits" onClick={() => outfitsActionClickHander()}>☒</p>)
  }


  return cardData ? (
    <div className={className} >
      {/* <button className="c-card-action">⭐</button> */}
      {actionButtons[action]}
      <img className="c-card-img" onClick={() => cardClickHandler()}
        src={cardData.hasOwnProperty("photos") && cardData.photos[0].thumbnail_url !== null
        ? cardData.photos[0].thumbnail_url
        : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"} />
      <p className="c-card-cat">{cardData.category}</p>
      <p className="c-card-name" onClick={() => cardClickHandler()}>{cardData.name}</p>
      {priceString}
      <p className="c-card-star">STAR RATING</p>
      <Stars itemId={itemId} />
    </div>
  ) : (
  <div className="c-card-container">
    No Data
  </div>
  );
}
export default Card