import React,{useState,useEffect} from 'react';
import Image from "./Image.jsx";
const ImageSelect = (props) => {

  return (
    props.style.photos.map((value, index) => {
      // console.log("no problems at index: " , index);
      // if(index%7===0) {
      //   props.handlePage;
      // }
      return <Image
      key = {index}
      thumbnail={value.thumbnail_url}
      handleIndex = {props.handleIndex}
      index = {index}
      currentIndex= {props.currentIndex}
      lowIndex = {props.lowIndex}
      highIndex = {props.highIndex}/>
    })
  )
}
export default ImageSelect