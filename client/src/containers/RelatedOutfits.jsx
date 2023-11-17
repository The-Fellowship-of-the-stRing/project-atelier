import React from 'react';
import {useState, useEffect} from 'react';
import Card from '../components/related_outfits/Card.jsx';
import Related from '../components/related_outfits/Related.jsx';
import Outfits from '../components/related_outfits/Outfits.jsx';
import '../stylesheets/related_outfits/relatedOutfits.css';
import '../utils/getFirstItem.js';

const RelatedOutfits = ( {itemId} ) => {

  return (
    <div className="c related-outfits-main-container">
      CONTAINER Related and Outfits
      <Related itemId={itemId}/>
      <Outfits itemId={itemId}/>
      <Card itemId={itemId}/>
    </div>
  )
}

export default RelatedOutfits