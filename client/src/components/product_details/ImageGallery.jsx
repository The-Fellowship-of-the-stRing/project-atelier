import React from 'react';
import '../../stylesheets/product_details/imageGallery.css';
import ImageSelect from './ImageSelect.jsx';
const ImageGallery = ({ style}) => {
  return style?(
    <div className="g-images-container">
      <div className= "g-images-select">
        <ImageSelect style = {style}/>
      </div>

      <div className= "g-images-main-container">
      <img  className="g-images-main" src={style.photos[0].url}/>
      </div>
    </div>
  ):
  <div>
    Loading gallery images
  </div>
}
export default ImageGallery