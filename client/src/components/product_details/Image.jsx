import React,{useState,useEffect} from 'react';
const Style = ({thumbnail,handleIndex,index}) => {
  return(
     <img className="g-image_select" src = {thumbnail} onClick ={()=> handleIndex(index)}/>
    )
}
export default Style