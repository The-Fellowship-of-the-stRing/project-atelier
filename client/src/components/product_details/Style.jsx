import React,{useState,useEffect} from 'react';
const Style = ({thumbnail,handleStyle,index}) => {
  return(
     <img className= "g-style_image" src = {thumbnail} onClick ={()=> handleStyle(index)}/>
    )
}
export default Style