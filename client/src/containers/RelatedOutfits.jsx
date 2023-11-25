import React from 'react';
import {useState, useEffect} from 'react';
import Card from '../components/related_outfits/Card.jsx';
import Related from '../components/related_outfits/Related.jsx';
import Outfits from '../components/related_outfits/Outfits.jsx';
import '../stylesheets/related_outfits/relatedOutfits.css';
import '../utils/getFirstItem.js';

const RelatedOutfits = ( {itemId, itemFeatures, itemName, updateMainProduct} ) => {

  /*
  RENDERING LOGIC UPDATES:
  - If product is in outfits and is a related product, do not render id Related Products
  */
  return (
    <div className="c-related-outfits-main-container">
      <h3 className="c-related-title">Related Products</h3>
      <Related itemId={itemId} itemName={itemName} itemFeatures={itemFeatures} updateMainProduct={updateMainProduct}/>
      <h3 className="c-outfit-title">My Outfit</h3>
      <Outfits itemId={itemId} updateMainProduct={updateMainProduct}/>
    </div>
  )
}

export default RelatedOutfits