import React from 'react';
import {useState,useEffect} from 'react';
import '../../stylesheets/product_details/styleList.css';
const StyleList = ({itemId,styles}) => {
  const [style, setStyle] = useState(styles[0]);
  const Style = ({thumbnail}) => {
    return(
       <img className= "g-style_image" src = {thumbnail}/>
      )
  }
  const StyleGallery = (props) => {
    return(
      props.styles.map((value) => {
        return <Style key ={value.style_id} thumbnail={value.photos[0].thumbnail_url} />
      })
    )
  }
  return (
    <div className="g-styleList">
       Selected Style: {style.name}
       <div className= "g-styleGallery">
       <StyleGallery styles = {styles}/>
       </div>
    </div>
    )

}
export default StyleList