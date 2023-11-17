import React from 'react';
import {useState, useEffect} from 'react';
import getItemDetails from '../../utils/getItemDetails.js';

const Card = ( {itemId} ) => {
  return (
    <div className="c card-container">
      {itemId}
    </div>
  )
}
export default Card