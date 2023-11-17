import React from 'react';
import {useState, useEffect} from 'react';
import getItemDetails from '../../utils/getItemDetails.js';

const Card = ( {itemId} ) => {
  let data = getItemDetails(itemId);
  console.log(data);

  return (
    <div className="c card-container">
    </div>
  )
}
export default Card