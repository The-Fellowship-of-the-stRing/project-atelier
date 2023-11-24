import React, { useEffect, useState } from 'react';
import ExpandedView from './ExpandedView.jsx';
import '../../stylesheets/product_details/imageGallery.css';
import ImageSelect from './ImageSelect.jsx';
const ImageGallery = ({itemId, style}) => {
  const [currentIndex,setCurrentIndex] =  useState(0);
  const [pageCount, setPageCount] = [1];
  const [lowIndex,setLowIndex] = [0];
  const [highIndex, setHighIndex] = [7];
  const handleIndex = async (value) => {
    await setCurrentIndex(value)
  }
  const handlePage = () => {
    setPageCount(pageCount+1);
  }

  const handlePageIndexRaise = () => {
    setLowIndex(lowIndex + 7);
    setHighIndex(highIndex + 7);
  }
  const handlePageIndexLower = () => {
    setLowIndex(lowIndex - 7);
    setHighIndex(highIndex - 7);
  }

  useEffect(()=> {
    setCurrentIndex(0);
  },[style]);

  return style?(
    <div className="g-images-container">
      <div className= "g-images-select">
        {lowIndex>0&&<button onClick={()=> handlePageIndexLower}>PageDown</button>}
        <ImageSelect
        style = {style}
        handleIndex= {handleIndex}
        currentIndex={currentIndex}
        handlePage = {handlePage}
        handlePageIndexLower= {handlePageIndexLower}
        handlePageIndexRaise />
        {(highIndex/7) < pageCount && <button onClick={()=> handlePageIndexRaise}>PageDown</button>}
      </div>
      <div className= "g-images-main-container">
       {currentIndex>0&&<button>PageDown</button>}
      <img  className="g-images-main" src={style.photos[`${currentIndex}`].url}/>
      <button>PageUp</button>
      </div>
    </div>
  ):
  <div>
    Loading gallery images
  </div>
}
export default ImageGallery