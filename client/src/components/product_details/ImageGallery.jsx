import React, { useEffect, useState } from 'react';
import ExpandedView from './ExpandedView.jsx';
import '../../stylesheets/product_details/imageGallery.css';
import ImageSelect from './ImageSelect.jsx';
const ImageGallery = ({itemId, style}) => {
  const [currentIndex,setCurrentIndex] =  useState(0);
  const handleIndex = async (value) => {
    console.log('handleIndex was clicked index is: ', value )
    await setCurrentIndex(value)
  }
  return style?(
    <div className="g-images-container">
      <div className= "g-images-select">
        <ImageSelect style = {style} handleIndex= {handleIndex}/>
      </div>

      <div className= "g-images-main-container">
      <img  className="g-images-main" src={style.photos[`${currentIndex}`].url}/>
      </div>
    </div>
  ):
  <div>
    Loading gallery images
  </div>
}
export default ImageGallery