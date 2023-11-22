import React,{useState,useEffect} from 'react';
import Style from "./Style.jsx";
const StyleGallery = (props) => {
  return(
    props.styles.map((value, index) => {
      return <Style key ={value.style_id} thumbnail={value.photos[0].thumbnail_url} handleStyle= {props.handleStyle} index={index}/>
    })
  )
}

export default StyleGallery