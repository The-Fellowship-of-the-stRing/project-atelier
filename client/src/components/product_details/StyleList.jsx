import React from 'react';
import {useState,useEffect} from 'react';
import '../../stylesheets/product_details/styleList.css';
const StyleList = ({itemId,styles,style, handleStyle}) => {

  const Style = ({thumbnail}) => {
    return(
       <img className= "g-style_image" src = {thumbnail}/>
      )
  }
  const StyleGallery = (props) => {
    return(
      props.styles.map((value, index) => {
        return <Style key ={value.style_id} thumbnail={value.photos[0].thumbnail_url} onClick ={(e)=>handleStyle(e)} />
      })
    )
  }

  return (
    <div className="g-styleList">
       {/* Selected Style: {style.name} */}
       <div className= "g-styleGallery">
       <StyleGallery styles = {styles}/>
       </div>
    </div>
    )

}
export default StyleList