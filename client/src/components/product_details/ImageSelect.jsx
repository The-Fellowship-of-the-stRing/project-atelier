import React,{useState,useEffect} from 'react';
import Image from "./Image.jsx";
const ImageSelect = (props) => {
  console.log(props);
  return(
    props.style.map((value, index) => {
      return <Image />
    })
  )
}