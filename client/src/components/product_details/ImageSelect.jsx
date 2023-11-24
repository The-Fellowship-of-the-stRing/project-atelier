import React,{useState,useEffect} from 'react';
import Image from "./Image.jsx";
const ImageSelect = (props) => {
  return(
    props.style.photos.map((value, index) => {
      return <Image key = {index} thumbnail={value.thumbnail_url} />
    })
  )
}
export default ImageSelect