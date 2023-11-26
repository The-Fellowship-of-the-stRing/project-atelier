import React,{useState,useEffect} from 'react';
const Image = ({thumbnail,handleIndex,index, currentIndex, lowIndex, highIndex}) => {
  return (lowIndex<=index && highIndex>index) ? (
    <div>
      {currentIndex!== index && <img className="g-image_select" src = {thumbnail} onClick ={()=> handleIndex(index)}/>}
      {currentIndex=== index && <img className="g-image_selected" src = {thumbnail} onClick ={()=> handleIndex(index)}/>}
    </div>
    )
    :
    <div>
    </div>
}
export default Image;
