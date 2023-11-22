import React, { useEffect, useState } from 'react';
import ExpandedView from './ExpandedView.jsx';
import '../../stylesheets/product_details/imageGallery.css';
import ImageSelect from './ImageSelect.jsx';
const ImageGallery = ({itemId, style}) => {
  return style?(
    <div className="g-images-container">
      <div className= "g-images-select">
        Hello
      </div>
      <img  className="g-images-main" src={style.photos[0].url}/>
      <div className= "g-images-main-container">

      </div>
    </div>
  ):
  <div>
    Loading gallery images
  </div>
}
export default ImageGallery