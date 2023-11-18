import React,{useState, useEffect} from 'react';
// import getItemDetails from '../../utils/getItemDetails.js';
import getCardData from '../../utils/getCardData.js';

const Card = ( {itemId} ) => {
  const [cardData, setCardData] = useState(getCardData(itemId));

  return (
    <div className="c card-container">
      <div>{itemId}</div>
      <div>{cardData.name}</div>
      <div>{cardData.features}</div>
      <div>{cardData.category}</div>
      <div>{cardData.originalPrice}</div>
      <div>{cardData.originalPrice}</div>
      <div>{cardData.photos}</div>
    </div>
  )
}
export default Card