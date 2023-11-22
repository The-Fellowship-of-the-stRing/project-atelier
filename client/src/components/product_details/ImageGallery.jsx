import React, { useEffect, useState } from 'react';
import ExpandedView from './ExpandedView.jsx';
import '../../stylesheets/product_details/imageGallery.css';
const ImageGallery = ({itemId, style}) => {
console.log(style);
  return style?(
    <div className="g-images">
      ImageGallery
      <img src={style.photos[0].url}/>
    </div>
  ):
  <div>
    Loading gallery images
  </div>
}
export default ImageGallery