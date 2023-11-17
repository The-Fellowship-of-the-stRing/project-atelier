import React,{useState, useEffect} from 'react';
// import getItemDetails from '../../utils/getItemDetails.js';
import getCardData from '../../utils/getCardData.js';

const Card = ( {itemId} ) => {
  // console.log("Card ID:", itemId)
  getCardData(itemId);
  return (
    <div className="c card-container">
      {itemId}
    </div>
  )
}
export default Card