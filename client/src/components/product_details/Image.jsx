import React,{useState,useEffect} from 'react';
const Style = ({thumbnail,handleImage,index}) => {
  return(
     <img className="g-image_select" src = {thumbnail} onClick ={()=> handleImage(index)}/>
    )
}
export default Style